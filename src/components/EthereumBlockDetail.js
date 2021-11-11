// import React from 'react';
import React, { useState, useEffect } from "react";
import { IconButton } from '@mui/material';
import { ArrowLeft , ArrowRight} from '@mui/icons-material';
const ethers = require("ethers");
const url = "https://mainnet.infura.io/v3/bc714f3896364905a60f67050ca54f83"
var provider = new ethers.providers.JsonRpcProvider(url);


async function getBlock(block_num) {
    console.log("GETTING BLOCK")
    let block = await provider.getBlock(block_num);
    console.log("BLOCK AWAIT DONE: ", block) 
    return block;
}

async function getCurrentBlock() {
    let curr_block_num = await provider.getBlockNumber();
    // console.log("currBlock:", currBlock)
    return await getBlock(curr_block_num);
}

const Block = () => {
    // const [block, setBlock] = React.useState(new Block());
    const [block, setBlock] = useState({});
    const [parentBlocks, setParentBlocks] = useState([]);
    useEffect(() => {
        async function fetchCurrentBlock() {
            let currentBlock = getCurrentBlock();
            setBlock(currentBlock);
        }
        fetchCurrentBlock();
        // setBlock(currentBlock);
    }, [block]);

    async function gotoPrevBlock() {
        console.log("gotoPrevBlock");
        console.log("Curr Number: ", block.number);
        console.log("Parent Hash: ", block.parentHash);
        let prevblock = await provider.send("eth_getBlockByHash", [block.parentHash, false]);
        console.log("preblock", prevblock)
        setBlock(prevblock);
        // setState(prevState => ({
        //     ...prevState,
        //     block: prevblock,
        // }));
        console.log("Parent Hash: ", block.number);
    }

    return (
        <div>
            <div class="flexbox-container">
                <IconButton aria-label="delete" size="small" onClick={ gotoPrevBlock}>
                    <ArrowLeft style={{ fontSize: 60 }}  />
                </IconButton>
                <h1> Block: {block.number}</h1>
                <IconButton aria-label="delete" size="small">
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
