const { GetAndVerify, GetProof, VerifyProof } = require('eth-proof')
const getAndVerify = new GetAndVerify("https://mainnet.infura.io");

(async ()=>{

	let txHash='0x8d0da05c3256da94a4213149de3e17fae7d1fd1b86fd4e57557527325ba87adc'
	let indexOfLog = 0

	let resp = await getAndVerify.get.receiptProof(txHash)
	let blockHashFromHeader = VerifyProof.getBlockHashFromHeader(resp.header)
	//if(!toBuffer(trustedBlockHash).equals(blockHashFromHeader)) throw new Error('BlockHash mismatch')
	let receiptsRoot = VerifyProof.getReceiptsRootFromHeader(resp.header)
	let receiptsRootFromProof = VerifyProof.getRootFromProof(resp.receiptProof)
	if(!receiptsRoot.equals(receiptsRootFromProof)) throw new Error('ReceiptsRoot mismatch')
	let receipt = await VerifyProof.getReceiptFromReceiptProofAt(resp.receiptProof, resp.txIndex)
	console.log(VerifyProof.receiptContainsLogAt(receipt, indexOfLog))
	return VerifyProof.receiptContainsLogAt(receipt, indexOfLog)

//let prf = await getAndVerify._logAgainstBlockHash('0x8d0da05c3256da94a4213149de3e17fae7d1fd1b86fd4e57557527325ba87adc', 0, )
//console.log(prf)
//VerifyProof.log(prf.rlpLogIndex, prf.value, prf.rlpTxIndex, prf.receipt, prf.branch, prf.header, prf.blockHash)
})();
