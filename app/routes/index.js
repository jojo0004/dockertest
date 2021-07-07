//var express = require('express');
//var router = express.Router();
//var JsBarcode = require('jsbarcode');
//var Canvas = require('canvas');
//var QRCode = require('qrcode');
//var fs = require('fs');
//const nodeHtmlToImage = require('node-html-to-image');
//
//router.get('/qr/:textId/:suffix/:ref1/:ref2/:amount', (req, res, next) => {
//
//    const textId = req.params.textId
//    const suffix = req.params.suffix
//    const ref1 = req.params.ref1
//    const ref2 = req.params.ref2
//    const amount = req.params.amount
//
//    var barcodeData = "|";
//    barcodeData += textId;
//    barcodeData += suffix + "\r";
//    barcodeData += ref1 + "\r";
//    barcodeData += ref2 + "\r";
//    barcodeData += amount + "\r";
//    var canvas = new Canvas.createCanvas(width= 1000, height=1000);
//    
//    QRCode.toCanvas(canvas,barcodeData)
//    res.contentType('image/jpeg');
//    res.end(canvas.toBuffer());
//
//});
//module.exports = router;