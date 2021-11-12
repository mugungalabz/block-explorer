import React, { useState, useEffect } from "react";
import { IconButton } from '@mui/material';
import { ArrowLeft , ArrowRight} from '@mui/icons-material';
const ethers = require("ethers");
// const url = "https://mainnet.infura.io/v3/bc714f3896364905a60f67050ca54f83"
const url = "https://eth-mainnet.alchemyapi.io/v2/yEr4dbyC2pPEvPKTPk-cjT6Rj4twydp_"
var provider = new ethers.providers.JsonRpcProvider(url);


// async function getBlock(block_num) {
//     console.log("GETTING BLOCK")
//     let block = await provider.getBlock(block_num);
//     console.log("BLOCK AWAIT DONE: ", block) 
//     return block;
// }

async function getCurrentBlock() {
    let curr_block_num = await provider.getBlockNumber();
    let block = await provider.getBlock(curr_block_num);
    console.log("provider await block", block);
    return block;
}

const Block = () => {
    const [block, setBlock] = useState({});
    const [parentBlocks, setParentBlocks] = useState([]);
    useEffect(() => {
        async function fetchCurrentBlock() {
            let currentBlock = await getCurrentBlock();
            setBlock(currentBlock);
        }
        fetchCurrentBlock();
    }, []);

    async function gotoPrevBlock() {
        let prevblock = await provider.send("eth_getBlockByHash", [block.parentHash, false]);
        parentBlocks.push(block);
        setParentBlocks((parentBlocks));
        setBlock(prevblock);
    }
    async function gotoNextBlock() {
        if (parentBlocks.length > 0) {
            let nextblock = parentBlocks.pop();
            setBlock(nextblock);
        }
    }

    return (
        <div>
            <div className="flexbox-container">
                <IconButton aria-label="delete" size="small" onClick={ gotoPrevBlock}>
                    <ArrowLeft style={{ fontSize: 60 }}  />
                </IconButton>
                <h1> Block: {block.number}</h1>
                <IconButton aria-label="delete" size="small" onClick={ gotoNextBlock}>
                    <ArrowRight style={{ fontSize: 60 }}  />
                </IconButton>
            </div>
            
            <p>Timestamp: {block.timestamp}</p>
            <p>Hash: {block.hash}</p>
            <p>Parent Hash: {block.parentHash}</p>
            <p>Miner: {block.miner}</p>
        </div>
    );
};

export default Block;
