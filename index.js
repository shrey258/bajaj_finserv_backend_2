const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mime = require('mime-types');
const fs = require('fs');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: "https://bajaj-finserv-frontend-2.vercel.app/"
  }));
app.use(morgan('dev'));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;


app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});


const isNumber = (str) => /^[0-9]+$/.test(str);


const getHighestLowercase = (arr) => {
    const lowercase = arr.filter(c => c === c.toLowerCase() && c !== c.toUpperCase());
    return lowercase.length > 0 ? [lowercase.sort().reverse()[0]] : [];
};


app.post('/bfhl', async (req, res) => {
    const { data, file_b64 } = req.body;

    
    const numbers = data.filter(isNumber);
    const alphabets = data.filter((item) => !isNumber(item));
    const highestLowercaseAlphabet = getHighestLowercase(alphabets);

   
    let file_valid = false;
    let file_mime_type = 'unknown';
    let file_size_kb = 0;

    if (file_b64) {
        try {
            const buffer = Buffer.from(file_b64, 'base64');
            file_size_kb = buffer.length / 1024;

            const extension = 'png';
            file_mime_type = mime.lookup(extension) || 'application/octet-stream';
            file_valid = true;
        } catch (error) {
            file_valid = false;
        }
    }



    
    res.json({
        is_success: true,
        user_id: "shreyansh_gupta_30032004", 
        email: "sa0258@srmist.edu.in",  
        roll_number: "RA2111003011225",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet,
        file_valid,
        file_mime_type,
        file_size_kb
    });
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
