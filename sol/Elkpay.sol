pragma solidity ^0.4.4;
contract Elkpay {
    
    address public owner;
    
    enum ProposalState {
        WAITING,
        ACCEPTED,
        REPAID,
        CANCELLED
    }

    struct Proposal {
        address lender;
        uint loanId;
        ProposalState state;
        uint rate;
        uint amount;
        uint paidDate;
    }
    
    enum LoanState {
        ACCEPTING,
        LOCKED,
        SUCCESSFUL,
        FAILED
    }
    
    struct Loan {
        address borrower;
        LoanState state;
        uint dueDate;
        uint amount;
        uint proposalCount;
        uint collected;
        uint startDate;
        uint endDate;
        mapping (uint=>uint) proposal;
    }

    Loan[] public loanList;
    Proposal[] public proposalList;

    mapping (address=>uint[]) public loanMap;
    mapping (address=>uint[]) public lendMap;
    mapping (address=>uint) public adhaar;
    mapping (address=>uint) public rating;

    modifier assertLoanState(LoanState _state) {
        assert(_state == LoanState.ACCEPTING);
        _;
    }

    modifier assertLoanValue(uint value, uint loanAmount) {
        assert(value <= loanAmount);
        _;
    }

    modifier assertDate(uint endDate, uint currentDate) {
        assert(endDate > currentDate);
        _;
    }

    modifier assertProposalState(ProposalState state) {
        assert(state == ProposalState.WAITING);
        _;
    }

    function CrowdBank() public {
        owner = msg.sender;
    }
    
    function addAdhaar(address person, uint _adhaar) public {
        adhaar[person] = _adhaar;
    }

    function getAdhaar(address person) public view returns(uint) {
        return adhaar[person];
    }

    function getRating(address person) public view returns(uint) {
        return rating[person];
    }

    function newLoan(uint amount, uint dueDate, uint endDate, uint startDate) public returns(bool) {

        loanList.push(Loan(msg.sender, LoanState.ACCEPTING, dueDate, amount, 0, 0, startDate, endDate));
        loanMap[msg.sender].push(loanList.length-1);
        buildreputationOfBorrower(msg.sender, startDate);
        return true;
    }

    function newProposal(uint loanId, uint rate, uint currentDate) public 
    assertLoanState(loanList[loanId].state) 
    assertLoanValue(msg.value, loanList[loanId].amount) 
    assertDate(loanList[loanId].endDate, currentDate) 
    payable {
        proposalList.push(Proposal(msg.sender, loanId, ProposalState.WAITING, rate, msg.value, 0));
        lendMap[msg.sender].push(proposalList.length-1);
        loanList[loanId].proposalCount++;
        loanList[loanId].proposal[loanList[loanId].proposalCount-1] = proposalList.length-1;
    }

    function revokeMyProposal(uint id) 
    public 
    returns(string){        
        uint proposeId = lendMap[msg.sender][id];
        if (proposalList[proposeId].state != ProposalState.WAITING) 
            return "Loan proposal has been accepted already";
        uint loanId = proposalList[proposeId].loanId;
        if (loanList[loanId].state == LoanState.ACCEPTING) {
            proposalList[proposeId].state = ProposalState.CANCELLED;
            msg.sender.transfer(proposalList[proposeId].amount);
            return "Loan amount has been repaid to your account successfully";
        }
        return "Error has occured.";
    }

    function lockLoan(uint loanId) public {
        if (loanList[loanId].state == LoanState.ACCEPTING) {
            loanList[loanId].state = LoanState.LOCKED;
            for (uint i = 0; i < loanList[loanId].proposalCount; i++) {
                uint numI = loanList[loanId].proposal[i];
                if (proposalList[numI].state == ProposalState.ACCEPTED) {
                    msg.sender.transfer(proposalList[numI].amount); //Send to borrower
                } else if(proposalList[numI].state == ProposalState.WAITING) {
                    proposalList[numI].state = ProposalState.REPAID;
                    proposalList[numI].lender.transfer(proposalList[numI].amount); //Send back to lender
                }
            }
        }
        else
          return;
    }
    
    //Amount to be Repaid
    function getRepayValue(uint loanId, uint currentDate) public view returns(uint) {
        if (loanList[loanId].state == LoanState.LOCKED) {
            uint time = loanList[loanId].startDate;
            uint finalamount = 0;
            for (uint i = 0; i < loanList[loanId].proposalCount; i++) {
                uint numI = loanList[loanId].proposal[i];
                if (proposalList[numI].state == ProposalState.ACCEPTED) {
                    uint original = proposalList[numI].amount;
                    uint rate = proposalList[numI].rate;
                    uint interest = (original*rate*(currentDate - time))/(365*24*60*60*100);
                    finalamount += interest;
                    finalamount += original;
                    break;
                }
            }
            return finalamount;
        }
        else
          return (2**64 - 1);
    }

    function repayLoan(uint loanId, uint currentDate) public payable returns(string) {
        uint toBePaid = getRepayValue(loanId, currentDate);
        uint time = loanList[loanId].startDate;
        uint paid = msg.value;
        if (paid >= toBePaid) {
            uint remain = paid - toBePaid;
            loanList[loanId].state = LoanState.SUCCESSFUL;
            for (uint i = 0; i < loanList[loanId].proposalCount; i++) {
                uint numI = loanList[loanId].proposal[i];
                if (proposalList[numI].state == ProposalState.ACCEPTED) {
                    uint original = proposalList[numI].amount;
                    uint rate = proposalList[numI].rate;
                    uint interest = (original*rate*(currentDate - time))/(365*24*60*60*100);
                    uint finalamount = interest + original;
                    proposalList[numI].lender.transfer(finalamount);
                    proposalList[numI].state = ProposalState.REPAID;
                    proposalList[numI].paidDate = currentDate;
                }
            }
            msg.sender.transfer(remain);
            buildreputationOfBorrower(msg.sender, currentDate);
            return "Loan has been repaid";
        } else {
            // msg.sender.transfer(paid);
            return "Loan amount is bigger than you are paying";
        }
    }
    
    function acceptProposal(uint proposeId, uint loanId) public returns(string){
        Proposal pObj = proposalList[proposeId];
        if (pObj.state != ProposalState.WAITING) 
            return "This proposal is no longer available.";

        Loan lObj = loanList[loanId];
        if (lObj.state != LoanState.ACCEPTING) 
            return "Your loan is no longer available.";

        if (lObj.collected + pObj.amount <= lObj.amount) {
            loanList[loanId].collected += pObj.amount;
            proposalList[proposeId].state = ProposalState.ACCEPTED;
            return "The proposal has been accepted successfully.";
        }
        return "An error has occured in acceptproposal().";
    }

    function totalProposalsBy(address lender) public view returns(uint) {
        return lendMap[lender].length;
    }

    function getProposalAtPosFor(address lender, uint pos) public view returns(address, uint, ProposalState, uint, uint, uint, uint, uint) {
        Proposal obj = proposalList[lendMap[lender][pos]];
        return (obj.lender, obj.loanId, obj.state, obj.rate, obj.amount, loanList[obj.loanId].amount, loanList[obj.loanId].dueDate, obj.paidDate);
    }   

    function totalLoansBy(address borrower) public view returns(uint) {
        return loanMap[borrower].length;
    }

    function getLoanDetailsByAddressPosition(address borrower, uint pos) public view returns(LoanState, uint, uint, uint, uint, uint, uint) {
        Loan obj = loanList[loanMap[borrower][pos]];
        return (obj.state, obj.dueDate, obj.amount, obj.collected, obj.proposalCount, obj.endDate, obj.startDate);
    }


    function getProposalDetailsByLoanIdPosition(uint loanId, uint numI) public view returns(ProposalState, uint, uint, uint, address) {
        Proposal obj = proposalList[loanList[loanId].proposal[numI]];
        return (obj.state, obj.rate, obj.amount, loanList[loanId].proposal[numI],obj.lender);
    }

    function numTotalLoans() public view returns(uint) {
        return loanList.length;
    }

    function getloanlList(uint id) public view returns(LoanState, uint, uint, uint, uint, uint, uint, address) {
        Loan obj = loanList[id];
        return (obj.state, obj.dueDate, obj.amount, obj.collected, obj.endDate, obj.startDate, obj.proposalCount, obj.borrower);
    }
    
    function buildreputationOfBorrower(address borrower, uint currentDate) public returns(uint) {
        uint noOfLoans = loanMap[borrower].length;
        uint reputation = 60;
        for(uint i = 0; i<noOfLoans; i++) {
            Loan obj = loanList[loanMap[borrower][i]];
            if(obj.state == LoanState.SUCCESSFUL || obj.state == LoanState.LOCKED) {
                uint proposalLength = obj.proposalCount;
                for(uint j = 0; j<proposalLength;j++) {
                    if(proposalList[obj.proposal[j]].state == ProposalState.REPAID){
                        if(obj.dueDate < proposalList[obj.proposal[j]].paidDate) {
                            reputation = reputation - 20;
                        } else {
                            reputation = reputation + 5;
                        }
                    } else if(proposalList[obj.proposal[j]].state == ProposalState.ACCEPTED) {
                        if(obj.dueDate < currentDate) {
                            reputation = reputation - 20;
                        }
                    }
                }
            }
            if(obj.state == LoanState.ACCEPTING) {
                reputation = reputation-10;
            }
        }
        rating[borrower] = reputation;
    }
}