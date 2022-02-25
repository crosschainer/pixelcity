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
var plot_keys = null;
var plot_object = null;
var building_keys = null;
var building_object = null;

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
        initialX: 1000,
        initialY: 300,
        initialZoom: 0.3,
        onTouch: function(e) {
            // `e` - is current touch event.

            return false; // tells the library to not preventDefault.
        }
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
            $.getJSON("js/plots.json", function (plot_json) {
                plot_keys = Object.keys(plot_json);
                plot_object = plot_json;
            });
            $.getJSON("js/buildings.json", function (building_json) {
                building_keys = Object.keys(building_json);
                building_object = building_json;
            });
            for (x = 0; x < (64) ;) {
                plot_keys.forEach((key, index) => {
             
                switch (x) {
                    case parseInt(key):
                       
                        $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixel_whale_info_v1/S/"+ plot_object[key] +"", function (plot) {
                            try {
                                
                                if (plot["con_pixel_whale_info_v1"]["S"][plot_object[key]]["owner"] == plots[plot_object[key]]["current_plot_owner"]) {
                                    if (plots[plot_object[key]]["built"] != undefined && plots[plot_object[key]]["built"] != "") {
                                        try{
                                        $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="'+ rewards["con_pixelcity_master_1"]["rewards"][plots[plot_object[key]]["current_plot_owner"]]["__fixed__"] +'" data-build="' + plots[plot_object[key]]["built"] + '" data-plot-owner="' + plots[plot_object[key]]["current_plot_owner"] + '" data-owner="' + plots[plot_object[key]]["current_build_owner"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots[plot_object[key]]["built"] + '.gif)"></div>');
                                        }
                                        catch{
                                            $("#city").append('<div class="plot" data-id="' + x + '" data-rewards="0" data-plot-owner="' + plots[plot_object[key]]["current_plot_owner"] + '" data-owner="' + plots[plot_object[key]]["current_build_owner"] + '" data-build="' + plots[plot_object[key]]["built"] + '" style="background-image:url(https://www.pixelwhale.io/gif/' + plots[plot_object[key]]["built"] + '.gif)"></div>');

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

                    default: 
                        if(x < 64){
                            $("#city").append('<div class="plot" data-id="' + x + '"></div>');
                            
                        }
                        x = x + 1;
                        break;
                    
                }
            });

            }
        });
    });
}
$("#build").click(function () {
    var plot_id = parseInt($("#plot_id").text());
    var shown_msg = false;
    var x = 0
    plot_keys.forEach((key, index) => {
    switch (plot_id) {
        case parseInt(key):
            console.log(key);
            if(plot_id in plot_keys){
                x = plot_object[key];
            }
            else{
                alert("This plot has not been minted yet");
            }
            break;
        default:
            if(plot_id in plot_keys){
                
            }
            else{
                if(shown_msg == false){
                alert("This plot has not been minted yet");
                shown_msg = true;
                }
            }
            break;
    }
    });
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
                    if (Object.values(building_object).indexOf(sha256(owned_buildings[i]["thing"])) > -1) {
                        $("#building_nfts").append("<option data-plot='" + x + "' value='" + sha256(owned_buildings[i]["thing"]) + "'>" + owned_buildings[i]["name"] + "</option>");
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

        stampLimit: 500,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
    $("#build_confirm").text("Waiting for TX..");
});

$("#set_name").click(function () {
    $('#plotModal').modal('hide');
    $('#nameModal').modal('show');
});

$("#build_name_confirm").click(function () {
    var build = $("#building_id").text();
    var name_text = $("#build_name").val();

    const detail = JSON.stringify({
        contractName: 'con_pixelcity_meta',
        methodName: 'set_metadata',
        networkType: 'mainnet',
        kwargs: {
            key: "name",
            value: name_text,
            build_thing: build
        },

        stampLimit: 200,
    });
    document.dispatchEvent(new CustomEvent('lamdenWalletSendTx', { detail }));
    $("#build_name_confirm").text("Waiting for TX..");
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
    if (response.detail.data.resultInfo.title=="Transaction Successful" && response.detail.data.txInfo.methodName == "set_metadata"){ 
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

        stampLimit: 500,
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


$(document).on("click", ".plot", function (e) {

    if(address != ""){
       
    
    var plotId = $(this).data('id');
    var plot_owner = $(this).data('plot-owner');
    var build_owner = $(this).data('owner');
    var rewards_owner = $(this).data('rewards');
    var build = $(this).data('build');
    $("#plot_id").text(plotId);
    $("#plot_id_build").text(plotId);
    $("#plot_id_real").text(plotId+1);
    $("#plot_id_build_real").text(plotId+1);
    $('#plotModal').modal('show');
    $('#build').hide()
        $('#owned').show();
        $("#building_id").text(build);
    $.getJSON("https://blockservice.nebulamden.finance/current/all/con_pixelcity_meta/metadata_builds", function (build_meta) {
        try {
            $("#build_custom_name").text(build_meta["con_pixelcity_meta"]['metadata_builds'][build]['user_defined']['name']);
        }
        catch {
                        $("#build_custom_name").text("Not set");

        }
    });
        
    if (build_owner == undefined) {
        $('#owned').hide();
        $('#build').show();
    }
    if (address == plot_owner && build_owner == undefined) {
        $('#build').show()
    }
    if (address == build_owner) {
        $('#collect_rewards').show();
        $('#set_name').show()
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