//const { use } = require("react");

let provider;
let signer;
let contract;
const CONTRACT_ADDRESS = "0xA9F95f6172460079c5a46aEF3A103A8C9eb0e42C";
const ABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "bxid",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "_hashValue",
				"type": "bytes32"
			}
		],
		"name": "addBox",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "issuedBy",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "soldierId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256[]",
				"name": "boxIndexes",
				"type": "uint256[]"
			}
		],
		"name": "BoxesIssued",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_soldierid",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "_boxIndexes",
				"type": "uint256[]"
			}
		],
		"name": "issuewithindexes",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "_status",
				"type": "bool"
			}
		],
		"name": "setEmergency",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "boxes",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "boxid",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "hashValue",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "used",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "emergencyMode",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBoxCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getBoxHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getFreeBoxes",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getRecord",
		"outputs": [
			{
				"internalType": "address",
				"name": "issuedBy",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "soldierId",
				"type": "uint256"
			},
			{
				"internalType": "uint256[]",
				"name": "boxIndexes",
				"type": "uint256[]"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getRecordCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "isboxFree",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "records",
		"outputs": [
			{
				"internalType": "address",
				"name": "issuedBy",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "soldierId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function connectWallet() {
	console.log(window.ethereum);
    if (!window.ethereum) {
        alert("Please install Metamask!");
        return;
    }
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.request({ method: "eth_requestAccounts" });
    signer = provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
    alert("Wallet Conneted!");
    let address=await signer.getAddress();
    document.getElementById("addr").innerText=address;
    document.getElementById("is_connected").innerHTML="CONNECTED";
    document.getElementById("btnconnected").style.display="none";
	contract.on("BoxesIssued", async () => {
        console.log("BoxesIssued event detected!");
        await loadLedgerFromBlockchain();
    });
}
function generateHash(text) {
    return ethers.utils.keccak256(ethers.utils.toUtf8Bytes(text));
}
async function addBox() {
    const boxId = document.getElementById("box_id").value;
    const boxBatch = document.getElementById("batch").value;
    const data = boxId + boxBatch;
    const hash = generateHash(data);
    console.log(hash,`Data : ${boxId} ${boxBatch}`);
    const tx = await contract.addBox(Number(boxId), hash);
    await tx.wait();
    let countvalue=document.getElementById("cnt").value;
    countvalue+=1;
    document.getElementById("cnt").innerText=countvalue;
    alert('Box Added!');
}
async function getFreeBoxes() {
    const free = await contract.getFreeBoxes();
    return free.map(x => Number(x));
}

function pickRandom(arr, count) {
    let result = new Set();
    while (result.size < count) {
        let r = Math.floor(Math.random() * arr.length);
        result.add(arr[r]);
    }
    return Array.from(result);
}
function showSelectedBoxes(arr) {
    document.getElementById("selected").innerText = "Assigned Boxes " + arr.join(" , ");
}
let currentBoxes = [];

async function logBoxHashes() {

    console.log("---- BOX HASH TEST ----");

    for (let index of currentBoxes) {
        const hash = await contract.getBoxHash(index);
        console.log(
            "Box Index:",
            index,
            "→ Hash:",
            hash
        );
    }

    console.log("------------------------");
}

async function requestBoxes() {

    const sid = document.getElementById("soldier-id").value;
    const need = Number(document.getElementById("max-quantity").value);

    if (!sid || !need) {
        alert("Fill Soldier ID and Count");
        return;
    }

    const free = await getFreeBoxes();

    if (free.length < need) {
        alert("Not enough boxes");
        return;
    }

    // Pick random free boxes
    currentBoxes = pickRandom(free, need);
    await logBoxHashes();

    console.log("Selected Box Indexes: ", currentBoxes);
    

    // Container for hash inputs
    const container = document.getElementById("hash-inputs-container");
    container.innerHTML = "<h3>Enter Hash Values:</h3>";

    // Create inputs
    for (let i = 0; i < need; i++) {

        const input = document.createElement("input");

        input.type = "text";
        input.placeholder = "Enter Hash for Box " + (i + 1);

        input.className = "hash-val form-input";
        input.style.display = "block";
        input.style.marginBottom = "10px";

        container.appendChild(input);
    }

    // Show verify button
    document.getElementById("verifyBtn").style.display = "block";

    alert("Now enter hash values");
}



async function getRealHash(index) {
    return await contract.getBoxHash(index);
}
async function verifyAndIssue() {

    if (currentBoxes.length === 0) {
        alert("Request boxes first!");
        return;
    }

    // Get all input fields
    const inputs = document.querySelectorAll(".hash-val");

    if (inputs.length !== currentBoxes.length) {
        alert("Hash count mismatch!");
        return;
    }

    let allCorrect = true;

    // Loop and verify each hash
    for (let i = 0; i < inputs.length; i++) {

        const userHash = inputs[i].value.trim();
        const realHash = await getRealHash(currentBoxes[i]);

        // Console testing
        console.log(`Box ${i + 1}`);
        console.log("User Hash :", userHash);
        console.log("Real Hash :", realHash);

        if (userHash !== realHash) {
            allCorrect = false;
            break;
        }
    }

    // Result
    if (!allCorrect) {
        alert("❌ Wrong Hash! Access Denied");
        return;
    }

    alert("✅ All Hashes Verified!");

    await issueBoxes();
}


async function issueBoxes() {

    const sid = document.getElementById("soldier-id").value;

    // Call blockchain
    const tx = await contract.issuewithindexes(
        Number(sid),
        currentBoxes
    );

    alert("Transaction Sent...");

    // Wait for confirmation
    const receipt = await tx.wait();

    alert("Boxes Issued!");

    // Add to ledger
    

    // Reset
    currentBoxes = [];
}

async function loadLedgerFromBlockchain() {

    const table = document.getElementById("ledgerBody");
    table.innerHTML = "";

    const count = await contract.getRecordCount();

    for (let i = 0; i < count; i++) {

        const record = await contract.getRecord(i);

        const issuedBy = record[0];
        const soldierId = record[1];
        const boxIndexes = record[2];
        const timestamp = Number(record[3]);

        const date = new Date(timestamp * 1000);

        const time =
            date.getHours().toString().padStart(2, "0") + ":" +
            date.getMinutes().toString().padStart(2, "0") + ":" +
            date.getSeconds().toString().padStart(2, "0");

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${time}</td>
            <td>${soldierId}</td>
            <td>ISSUED</td>
            <td>${boxIndexes.join(", ")}</td>
            <td class="tx-hash">${issuedBy.slice(0,6)}...${issuedBy.slice(-4)}</td>
        `;

        table.prepend(row);
    }
}
if (contract) {
    contract.on("BoxesIssued", async () => {
        await loadLedgerFromBlockchain();
    });
}