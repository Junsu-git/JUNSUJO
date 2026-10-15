const {serve}=require('./verify-portfolio.cjs');
serve().then(server=>console.log(`Portfolio preview: http://127.0.0.1:${server.address().port}`));
