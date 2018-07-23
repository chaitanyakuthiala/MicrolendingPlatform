
    // var web3 = window.web3;
       if(typeof web3 != 'undefined' && 0) {
        console.log(web3);
        web3 = new Web3(web3.currentprovider);
        console.log(web3.currentprovider);
    console.log('if executed');
    // console.log(web3.eth.accounts);
       } else {
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
    console.log("else executed");
}

web3.eth.defaultAccount = web3.eth.accounts[0];
var myContract = web3.eth.contract([
    {
        "constant": false,
        "inputs": [
            {
                "name": "proposeId",
                "type": "uint256"
            },
            {
                "name": "loanId",
                "type": "uint256"
            }
        ],
        "name": "acceptProposal",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "person",
                "type": "address"
            },
            {
                "name": "_adhaar",
                "type": "uint256"
            }
        ],
        "name": "addAdhaar",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "borrower",
                "type": "address"
            },
            {
                "name": "currentDate",
                "type": "uint256"
            }
        ],
        "name": "buildreputationOfBorrower",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "loanId",
                "type": "uint256"
            }
        ],
        "name": "lockLoan",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "amount",
                "type": "uint256"
            },
            {
                "name": "dueDate",
                "type": "uint256"
            },
            {
                "name": "endDate",
                "type": "uint256"
            },
            {
                "name": "startDate",
                "type": "uint256"
            }
        ],
        "name": "newLoan",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "loanId",
                "type": "uint256"
            },
            {
                "name": "rate",
                "type": "uint256"
            },
            {
                "name": "currentDate",
                "type": "uint256"
            }
        ],
        "name": "newProposal",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "loanId",
                "type": "uint256"
            },
            {
                "name": "currentDate",
                "type": "uint256"
            }
        ],
        "name": "repayLoan",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "revokeMyProposal",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "adhaar",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "person",
                "type": "address"
            }
        ],
        "name": "getAdhaar",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "getBalance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "borrower",
                "type": "address"
            },
            {
                "name": "pos",
                "type": "uint256"
            }
        ],
        "name": "getLoanDetailsByAddressPosition",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "id",
                "type": "uint256"
            }
        ],
        "name": "getloanlList",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "lender",
                "type": "address"
            },
            {
                "name": "pos",
                "type": "uint256"
            }
        ],
        "name": "getProposalAtPosFor",
        "outputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "loanId",
                "type": "uint256"
            },
            {
                "name": "numI",
                "type": "uint256"
            }
        ],
        "name": "getProposalDetailsByLoanIdPosition",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "uint256"
            },
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "person",
                "type": "address"
            }
        ],
        "name": "getRating",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "loanId",
                "type": "uint256"
            },
            {
                "name": "currentDate",
                "type": "uint256"
            }
        ],
        "name": "getRepayValue",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "lendMap",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "loanList",
        "outputs": [
            {
                "name": "borrower",
                "type": "address"
            },
            {
                "name": "state",
                "type": "uint8"
            },
            {
                "name": "dueDate",
                "type": "uint256"
            },
            {
                "name": "amount",
                "type": "uint256"
            },
            {
                "name": "proposalCount",
                "type": "uint256"
            },
            {
                "name": "collected",
                "type": "uint256"
            },
            {
                "name": "startDate",
                "type": "uint256"
            },
            {
                "name": "endDate",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            },
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "loanMap",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "numTotalLoans",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "proposalList",
        "outputs": [
            {
                "name": "lender",
                "type": "address"
            },
            {
                "name": "loanId",
                "type": "uint256"
            },
            {
                "name": "state",
                "type": "uint8"
            },
            {
                "name": "rate",
                "type": "uint256"
            },
            {
                "name": "amount",
                "type": "uint256"
            },
            {
                "name": "paidDate",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "rating",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "borrower",
                "type": "address"
            }
        ],
        "name": "totalLoansBy",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "lender",
                "type": "address"
            }
        ],
        "name": "totalProposalsBy",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]);
var contractFunctions = myContract.at('0xBB80cFD72c08c3b4318056423C0Eb07Fba61a3B3');
console.log(contractFunctions);
var PROPOSALSTATE = {
    0: "WAITING",
    1: "ACCEPTED",
    2: "REPAID",
    3: "CANCELLED"
}
var LOANSTATE = {
    0: "ACCEPTING",
    1: "LOCKED",
    2: "COMPLETED SUCCESSFUL",
    3: "COMPLETION FAILED"
}
var wtoE = 1000000000000000000;
// console.log(web3.eth.accounts);
        // console.log(contractFunctions.newLoan(11,1234567,0, {from: web3.eth.accounts[0], gas: 900000 }));
    //     contractFunctions.numTotalLoans(function(error, result){
    //         if(!error) {
    //     console.log(result);
    //     console.log(result['c']);
    //     console.log(result['c'][0]);
    //         } else {
    //     console.log(error);
    // }
// })
