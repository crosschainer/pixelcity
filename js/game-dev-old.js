$.ajaxSetup({
    async: false
});
//bruh
var sha256 = function sha256(ascii) {
    function rightRotate(value, amount) {
        return (value >>> amount) | (value << (32 - amount));
    };

    var mathPow = Math.pow;
    var maxWord = mathPow(2, 32);
    var lengthProperty = 'length'
    var i, j; // Used as a counter across the whole file
    var result = ''

    var words = [];
    var asciiBitLength = ascii[lengthProperty] * 8;

    //* caching results is optional - remove/add slash from front of this line to toggle
    // Initial hash value: first 32 bits of the fractional parts of the square roots of the first 8 primes
    // (we actually calculate the first 64, but extra values are just ignored)
    var hash = sha256.h = sha256.h || [];
    // Round constants: first 32 bits of the fractional parts of the cube roots of the first 64 primes
    var k = sha256.k = sha256.k || [];
    var primeCounter = k[lengthProperty];
    /*/
    var hash = [], k = [];
    var primeCounter = 0;
    //*/

    var isComposite = {};
    for (var candidate = 2; primeCounter < 64; candidate++) {
        if (!isComposite[candidate]) {
            for (i = 0; i < 313; i += candidate) {
                isComposite[i] = candidate;
            }
            hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
            k[primeCounter++] = (mathPow(candidate, 1 / 3) * maxWord) | 0;
        }
    }

    ascii += '\x80' // Append Ƈ' bit (plus zero padding)
    while (ascii[lengthProperty] % 64 - 56) ascii += '\x00' // More zero padding
    for (i = 0; i < ascii[lengthProperty]; i++) {
        j = ascii.charCodeAt(i);
        if (j >> 8) return; // ASCII check: only accept characters in range 0-255
        words[i >> 2] |= j << ((3 - i) % 4) * 8;
    }
    words[words[lengthProperty]] = ((asciiBitLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiBitLength)

    // process each chunk
    for (j = 0; j < words[lengthProperty];) {
        var w = words.slice(j, j += 16); // The message is expanded into 64 words as part of the iteration
        var oldHash = hash;
        // This is now the undefinedworking hash", often labelled as variables a...g
        // (we have to truncate as well, otherwise extra entries at the end accumulate
        hash = hash.slice(0, 8);

        for (i = 0; i < 64; i++) {
            var i2 = i + j;
            // Expand the message into 64 words
            // Used below if 
            var w15 = w[i - 15], w2 = w[i - 2];

            // Iterate
            var a = hash[0], e = hash[4];
            var temp1 = hash[7]
                + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) // S1
                + ((e & hash[5]) ^ ((~e) & hash[6])) // ch
                + k[i]
                // Expand the message schedule if needed
                + (w[i] = (i < 16) ? w[i] : (
                    w[i - 16]
                    + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3)) // s0
                    + w[i - 7]
                    + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10)) // s1
                ) | 0
                );
            // This is only used once, so *could* be moved below, but it only saves 4 bytes and makes things unreadble
            var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) // S0
                + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2])); // maj

            hash = [(temp1 + temp2) | 0].concat(hash); // We don't bother trimming off the extra ones, they're harmless as long as we're truncating when we do the slice()
            hash[4] = (hash[4] + temp1) | 0;
        }

        for (i = 0; i < 8; i++) {
            hash[i] = (hash[i] + oldHash[i]) | 0;
        }
    }

    for (i = 0; i < 8; i++) {
        for (j = 3; j + 1; j--) {
            var b = (hash[i] >> (j * 8)) & 255;
            result += ((b < 16) ? 0 : '') + b.toString(16);
        }
    }
    return result;
};
//bruh


var plots = null;
var rewards = null;
var address = "";

const detail = JSON.stringify({
    appName: 'PixelCity',
    version: '0.0.1',
    logo: 'logo.png',
    contractName: 'con_pixelcity_master_1',
    networkType: 'mainnet',
})



$(document).ready(function () {
    document.dispatchEvent(new CustomEvent('lamdenWalletGetInfo'));
    var island = document.querySelector('.zoomable')
    panzoom(island, {
        // now all zoom operations will happen based on the center of the screen
        initialX: 500,
        initialY: 300,
        initialZoom: 0.3
    });
    prepareCityPlots();
});

function prepareCityPlots() {
    $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixelcity_master_1/plots/", function (plotdata) {
        try {
            plots = plotdata["con_pixelcity_master_1"]["plots"];
        }
        catch {
            plots = {}
        }
        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixelcity_master_1/rewards/", function (rewardsdata) {
            rewards = rewardsdata;
            

            for (x = 0; x < 1024;) {
                switch (x) {
                    case 0:

                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27", function (plot) {
                            try {
                                
                                if (plot["con_pixel_whale_info_v1"]["S"]["c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27"]["owner"] == plots["c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27"]["current_plot_owner"]) {
                                    if (plots["c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27"]["built"] != undefined && plots["c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+ rewards["con_pixelcity_master_1"]["rewards"][plots["c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27"]["current_plot_owner"]]["__fixed__"] +'" data-plot-owner="' + plots["c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27"]["current_plot_owner"] + '" data-owner="' + plots["c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27"]["current_plot_owner"] + '" data-owner="' + plots["c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27"]["built"] + '.gif)"></div>');

                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                        });
                        x = x + 1;
                        break;



                    case 1:

                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952"]["owner"]  == plots["04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952"]["current_plot_owner"]) {
                                    if (plots["04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952"]["built"] != undefined && plots["04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952"]["built"] != "") {
                                        try{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952"]["current_plot_owner"] + '" data-owner="' + plots["04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952"]["current_plot_owner"] + '" data-owner="' + plots["04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952"]["built"] + '.gif)"></div>');

                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            

                        })
                        x = x + 1;
                        break;



                    case 2:


                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d"]["owner"] == plots["a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d"]["current_plot_owner"]) {
                                    if (plots["a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d"]["built"] != undefined && plots["a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d"]["built"] != "") {
                                        try{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d"]["current_plot_owner"] + '" data-owner="' + plots["a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d"]["current_plot_owner"] + '" data-owner="' + plots["a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d"]["built"] + '.gif)"></div>');
                                            
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    
                                }
                            }
                            catch(err) {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                
                            }
                            
                        })
                        x = x + 1;
                        break;



                    case 3:

                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45"]["owner"] == plots["12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45"]["current_plot_owner"]) {
                                    if (plots["12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45"]["built"] != undefined && plots["12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45"]["built"] != "") {
                                        
                                        try{
                                            
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45"]["current_plot_owner"] + '" data-owner="' + plots["12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45"]["built"] + '.gif)"></div>');
                                    
                                        }
                                        catch(err){
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45"]["current_plot_owner"] + '" data-owner="' + plots["12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45"]["built"] + '.gif)"></div>');
                                            
                                        }
                                        
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch(err) {
                                console.log(err);
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                           

                        });
                        x = x + 1;
                        break;

                    case 4:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76"]["owner"] == plots["f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76"]["current_plot_owner"]) {
                                    if (plots["f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76"]["built"] != undefined && plots["f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76"]["current_plot_owner"] + '" data-owner="' + plots["f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76"]["current_plot_owner"] + '" data-owner="' + plots["f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;
                    
                    case 5:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab"]["owner"] == plots["a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab"]["current_plot_owner"]) {
                                    if (plots["a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab"]["built"] != undefined && plots["a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab"]["current_plot_owner"] + '" data-owner="' + plots["a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab"]["current_plot_owner"] + '" data-owner="' + plots["a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;
                    case 6:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090"]["owner"] == plots["cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090"]["current_plot_owner"]) {
                                    if (plots["cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090"]["built"] != undefined && plots["cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090"]["current_plot_owner"] + '" data-owner="' + plots["cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090"]["current_plot_owner"] + '" data-owner="' + plots["cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;    
                    case 7:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2"]["owner"] == plots["21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2"]["current_plot_owner"]) {
                                    if (plots["21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2"]["built"] != undefined && plots["21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2"]["current_plot_owner"] + '" data-owner="' + plots["21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2"]["current_plot_owner"] + '" data-owner="' + plots["21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;
                    
                    case 8:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f"]["owner"] == plots["3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f"]["current_plot_owner"]) {
                                    if (plots["3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f"]["built"] != undefined && plots["3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f"]["current_plot_owner"] + '" data-owner="' + plots["3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f"]["current_plot_owner"] + '" data-owner="' + plots["3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                    
                                }
                                
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;
                    case 9:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81"]["owner"] == plots["9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81"]["current_plot_owner"]) {
                                    if (plots["9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81"]["built"] != undefined && plots["9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81"]["current_plot_owner"] + '" data-owner="' + plots["9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81"]["current_plot_owner"] + '" data-owner="' + plots["9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;
                    case 10:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f"]["owner"] == plots["a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f"]["current_plot_owner"]) {
                                    if (plots["a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f"]["built"] != undefined && plots["a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f"]["current_plot_owner"] + '" data-owner="' + plots["a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f"]["current_plot_owner"] + '" data-owner="' + plots["a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;
                    case 11:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123"]["owner"] == plots["eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123"]["current_plot_owner"]) {
                                    if (plots["eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123"]["built"] != undefined && plots["eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123"]["current_plot_owner"] + '" data-owner="' + plots["eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123"]["current_plot_owner"] + '" data-owner="' + plots["eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;
                    case 12:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388"]["owner"] == plots["564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388"]["current_plot_owner"]) {
                                    if (plots["564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388"]["built"] != undefined && plots["564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388"]["current_plot_owner"] + '" data-owner="' + plots["564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388"]["current_plot_owner"] + '" data-owner="' + plots["564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;
                    case 13:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59"]["owner"] == plots["2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59"]["current_plot_owner"]) {
                                    if (plots["2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59"]["built"] != undefined && plots["2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59"]["current_plot_owner"] + '" data-owner="' + plots["2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59"]["current_plot_owner"] + '" data-owner="' + plots["2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;
                    case 14:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb"]["owner"] == plots["e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb"]["current_plot_owner"]) {
                                    if (plots["e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb"]["built"] != undefined && plots["e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb"]["current_plot_owner"] + '" data-owner="' + plots["e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb"]["current_plot_owner"] + '" data-owner="' + plots["e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;
                    case 15:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584"]["owner"] == plots["c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584"]["current_plot_owner"]) {
                                    if (plots["c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584"]["built"] != undefined && plots["c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584"]["current_plot_owner"] + '" data-owner="' + plots["c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584"]["current_plot_owner"] + '" data-owner="' + plots["c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;
                    case 16:
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54", function (plot) {
                            try {
                                if (plot["con_pixel_whale_info_v1"]["S"]["d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54"]["owner"] == plots["d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54"]["current_plot_owner"]) {
                                    if (plots["d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54"]["built"] != undefined && plots["d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54"]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+rewards["con_pixelcity_master_1"]["rewards"][plots["d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54"]["current_plot_owner"]]["__fixed__"]+'" data-plot-owner="' + plots["d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54"]["current_plot_owner"] + '" data-owner="' + plots["d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54"]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots["d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54"]["current_plot_owner"] + '" data-owner="' + plots["d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54"]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots["d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54"]["built"] + '.gif)"></div>');
                                        }
                                    }
                                    else{
                                        $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                    }
                                }
                                else{
                                    $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                                }
                            }
                            catch {
                                $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            }
                            
                    
                        });
                        x = x + 1;
                        break;
                    default: $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                        x = x + 1;
                        break;

                }


            }
        });
    });
}
$("#build").click(function () {
    var plot_id = parseInt($("#plot_id").text());

    var x = 0
    switch (plot_id) {
        case 0:
            x = "c12d377168d2656d361f936d03a680e484e0d8775656068dc7083a8889b37c27";
            break;
        case 1:
            x = "04ecddc324c7f33b4c40312e875b32ee3c432b491d97f4a197932e612d23a952";
            break;
        case 2:
            x = "a943a888f76fae5c7a0cf5f39fad170d8f2166657da4b7eac77df31d3d37625d";
            break;
        case 3:
            x = "12374fcf2a3683550b095361cd1362887c94f55b11865266f7b119867a271c45";
            break;
        case 4:
            x = "f9658ca298b731c88adf9749cfc8c2a60d75ed1af5a0348920878de81e928c76";
            break;
        case 5:
            x = "a8bdddd6bf1efdbc890b062d01efe6681efd9fdbdfa0cf27f851aa2e10f840ab";
            break;
        case 6:
            x = "cfe0500f5e3600c7e93092205237776d44542b69b3db7bd48d30cd2de4a83090";
            break;
        case 7:
            x = "21356045b8fed83e2a4800e985399cb584fc6ea1c9368463bd6d3a158ac520b2";
            break;
        case 8:
            x = "3e84773a16c8a688f439b053a0e47849e30e560e1f8db102da98f79b99e0966f";
            break;
        case 9:
            x = "9e5df3257c33daf29611d1e83fa26a24556d7177b944fab1753ee564867dbd81";
            break;
        case 10:
            x = "a1ceb8b80da254230355de49b5139c123cac48f2e596a7bbcf63c0e1e878683f";
            break;
        case 11:
            x = "eadb297c05440b1972051db4f01043f1cd976aa6cf9fbb1b2a374d3546afb123";
            break;
        case 12:
            x = "564b1adfe68be6c4c37f978201ea7bdaef8c139d69f49192218f500494a3a388";
            break;
        case 13:
            x = "2d7cdb50830ff1c875bc7952132fabeeb87ba8a0d667c0f0b6ae3563a14c2e59";
            break;
        case 14:
            x = "e7ad2f016e524192367ceb6199ac81b2cedc2df4b8146b3a9d72f50e69d8a1cb";
            break;
        case 15:
            x = "c3b165c864011c42fae3a36a0b441c8c3f2b86db0e17a001b016309fa2c08584";
            break;
        case 16:
            x = "d0935bcf8cca45c17cb846bb92765092f39fb757477a43fd1b871f4bfd745e54";
            break;
        default:
            alert("This plot has not been minted yet");
            break;
    }
    console.log("PLOT UID: " + x);
    console.log("PLOT INTERNAL: " + plot_id);
    $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/" + x, function (plot_check) {
        console.log("PLOT OWNER: "+ plot_check["con_pixel_whale_info_v1"]["S"][x]["owner"]);
        console.log("LOGGED IN ADDRESS: " + address);
        if (plot_check["con_pixel_whale_info_v1"]["S"][x]["owner"] != address) {
            alert("You don't own this plot, so you cant build on it!");
        }
        else {
            $('#buildModal').modal('show');
            $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/", function (buildings) {
                let owned_buildings = Object.values(buildings["con_pixel_whale_info_v1"]["S"]).filter((obj) => {
                    return obj.owner == address
                });
                $("#building_nfts").empty();
                var arrayLength = owned_buildings.length;
                for (var i = 0; i < arrayLength; i++) {
                    if (sha256(owned_buildings[i]["thing"]) == "1b654b960496275a20999dad4dee24daf33be40924a453a3c2b1999940275e74" || sha256(owned_buildings[i]["thing"]) == "5eb1514e49ec2aa76d46ae52c82ab2af70f6591a6eea058b514af195839acef0" || sha256(owned_buildings[i]["thing"]) == "7cedb32b03e2ae1dbf95c7ae8e07e24e23857ec2ef2a3fe99c759b8046d63026" || sha256(owned_buildings[i]["thing"]) == "6532abf32b7a1c1796e51f636f543aaebf5a68534bfd9e9f2fdcca9f66ea7cc0" || sha256(owned_buildings[i]["thing"]) == "70a0da3a243fdbc2419a0fea9b5b2b322a3f04f929b1c092afa30858d3df3491" || sha256(owned_buildings[i]["thing"]) == "3b8c4414c8665ca797e92632431d641d79e4c18931dc86a3d397070dbfa8177a"  || sha256(owned_buildings[i]["thing"]) == "bdc0d91e8e795fa9fb51de173336b63ad7efd381ef0dee07725df35f73e19699" || sha256(owned_buildings[i]["thing"]) == "62eda85641008c26d9cdf8e54d5bfef220eefd6d47790921d6b48cf1b4a8852b" || sha256(owned_buildings[i]["thing"]) == "bf9e1d06839417543df8bf5c6c1dd57090e9efd95806a02980f215227bce31b6" || sha256(owned_buildings[i]["thing"]) == "373f2931bc3c496c2291466a3e8e534a4d84dda090b872e2a00aa9cc2bcf6d75" || sha256(owned_buildings[i]["thing"]) == "7d3b8e3bc9951786c3e1d1285089350286d87b0056d5eaa5f18018d1cfad0d59" || sha256(owned_buildings[i]["thing"]) == "395f7d499a10626fd30b11bc20bb94b9f91627187058dbd409cbc1fd40ba85a9" || sha256(owned_buildings[i]["thing"]) == "0d55c78b2d5da3ece5cd2f5ac34f3fc0665c3f9e49774d75886156635963b658"  || sha256(owned_buildings[i]["thing"]) == "1bf5c96fb62ef6e9518abdbf0903c1ca7ba6aa67f161b626e7c81229f0eda0c0"  || sha256(owned_buildings[i]["thing"]) == "74f87a1eb0535576bea042ff8d1cf67760b5583caa3ce873a8d36de4a48e0cca"  || sha256(owned_buildings[i]["thing"]) == "53736d3d8fb936a675b38f54961eea2020139b842ebd89994d19ed7bc5195da7" || sha256(owned_buildings[i]["thing"]) == "d74735f008a07caf1d625a648a0f1d9a9265525bd40c9859f9e58989d3069c5b" ) {
                        $("#building_nfts").append("<option data-plot='" + x + "' value='" + sha256(owned_buildings[i]["thing"]) + "'>" + owned_buildings[i]["name"] + "</option>");
                        //Do something
                    }
                }
            });
        }
    });
});

$("#build_confirm").click(function () {
    const detail = JSON.stringify({
        contractName: 'con_pixelcity_master_1',
        methodName: 'connect_built_to_plot',
        networkType: 'mainnet',
        kwargs: {
            plot_thing: $("#building_nfts").children("option:selected").data('plot'),
            build_thing: $("#building_nfts").children("option:selected").val()
        },

        stampLimit: 400,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
    $("#build_confirm").text("Waiting for TX..");
});

document.addEventListener('lamdenWalletTxStatus', (response) => {
      
    if (response.detail.data.resultInfo.title=="Transaction Successful" && response.detail.data.txInfo.methodName == "connect_built_to_plot"){ 
        location.reload();
        document.dispatchEvent(new CustomEvent('lamdenWalletInfo'));
    }
    if (response.detail.data.resultInfo.title=="Transaction Successful" && response.detail.data.txInfo.methodName == "claim_rewards"){ 
        location.reload();
        document.dispatchEvent(new CustomEvent('lamdenWalletInfo'));
    }
});


$("#connect_wallet").click(function () {
    document.dispatchEvent(new CustomEvent('lamdenWalletConnect', { detail }));
});

$("#collect_rewards").click(function () {
    const detail = JSON.stringify({
        contractName: 'con_pixelcity_master_1',
        methodName: 'claim_rewards',
        networkType: 'mainnet',
        kwargs: {
        },

        stampLimit: 400,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
    $("#collect_rewards").text("Waiting for TX..");
});

document.addEventListener('lamdenWalletInfo', (response) => {
    if (response.detail.errors === undefined) {
        address = response.detail.wallets[0];
        $("#connect_wallet").text("Connected");
        $("#connect_wallet").css("background-color", "#1ba3c2");
    }
});


$(document).on("click", ".plot", function () {
    if(address != ""){
       
    
    var plotId = $(this).data('id');
    var plot_owner = $(this).data('plot-owner');
    var build_owner = $(this).data('owner');
    var rewards_owner = $(this).data('rewards');
    $("#plot_id").text(plotId);
    $("#plot_id_build").text(plotId);
    $("#plot_id_real").text(plotId+1);
    $("#plot_id_build_real").text(plotId+1);
    $('#plotModal').modal('show');
    $('#build').hide()
    $('#owned').show();
    console.log(plot_owner);
    console.log(build_owner);
    if (build_owner == undefined) {
        $('#owned').hide();
        $('#build').show();
    }
    if (address == plot_owner && build_owner == undefined) {
        $('#build').show()
    }
    if (address == build_owner) {
        $('#collect_rewards').show();
    }
    else {
        $('#collect_rewards').hide();
    }
    if(isNaN(Number(rewards_owner).toFixed(8))){
        
        $("#rewards_owner").text(Number(0).toFixed(8));
    }
    else{
        $("#rewards_owner").text(Number(rewards_owner).toFixed(8));
    }
    
    $("#build_owner").text(build_owner);
    
}
else{alert ("Connect your Wallet first");}
});