var site_url = window.location.href.replace(/(^\w+:|^)\/\//, "").replace(/\//g, "-@-");
var catch_hover = false;
window.addEventListener("load", function (event) {
    var css_link_notification = document.createElement("link");
    css_link_notification.href = "https://staging-app.marketermagic.com/clickproof-notification.css";
    css_link_notification.type = "text/css";
    css_link_notification.rel = "stylesheet";
    css_link_notification.media = "screen,print";
    document.getElementsByTagName("head")[0].appendChild(css_link_notification);
    var pathUrl = window.location.pathname;
    var get_location = window.location.href;
    var urlParts = get_location.replace("http://", "").replace("https://", "").replace("www.", "").split(/[/?#]/);
    var domaind = urlParts[0];
    var current_location = domaind + pathUrl;
    var campaignToken = "74b43715-a14-53b5b";
    var projectToken = "4735b2d1-82b-b8884";
    window.onbeforeunload = function () {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this.responseText);
            }
        };
        xhttp.open("POST", "https://staging-app.marketermagic.com/api/changeusercount", !0);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("currentLocation=" + current_location + "&campaignToken=" + campaignToken + "&projectToken=" + projectToken);
    };
    (function (arr) {
        arr.forEach(function (item) {
            if (item.hasOwnProperty("remove")) {
                return;
            }
            Object.defineProperty(item, "remove", {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function remove() {
                    this.parentNode.removeChild(this);
                },
            });
        });
    })([Element.prototype, CharacterData.prototype, DocumentType.prototype]);
    function callAjax(data) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                try {
                    JSON.parse(this.responseText, !0);
                } catch (err) {
                    console.log("Invalid response/empty response/Plan Expired");
                    return;
                }
                var data = JSON.parse(this.responseText, !0);
                if (data != "not found" && data.proofData[0].redirect_destination_url.includes(current_location) && data.userWallet != 0) {
                    var recentActivityMessage = "";
                    var liveVisitorMessage = "";
                    var staticMessage = "";
                    var notificationDataArray = data.notificationData;
                    notificationDataArray.forEach(function (value, key) {
                        if (value.notify_id == 1) {
                            if (value.message != null) {
                                recentActivityMessage = value.message;
                            } else {
                                recentActivityMessage = data.defaultNotificationMessage.original[0].message;
                            }
                        }
                        if (value.notify_id == 2) {
                            if (value.message != null) {
                                liveVisitorMessage = value.message;
                            } else {
                                liveVisitorMessage = data.defaultNotificationMessage.original[1].message;
                            }
                            if (data.cp_base_path && data.cp_base_path != "" && value.image_path != null) {
                                live_custom_image = '<div class="click-proof-circle-recent"><img src="' + data.cp_base_path + value.image_path + '"></div>';
                            } else {
                                live_custom_image = '<div class="click-proof-circle"></div>';
                            }
                        }
                        if (value.notify_id == 3) {
                            if (value.message != null) {
                                staticMessage = value.message;
                            } else {
                                staticMessage = data.defaultNotificationMessage.original[2].message;
                            }
                            if (data.cp_base_path && data.cp_base_path != "" && value.image_path != null) {
                                custom_image = '<div class="click-proof-circle-recent" style="top: 12px;right: 7px;"><img src="' + data.cp_base_path + value.image_path + '"></div>';
                            } else {
                                custom_image =
                                    '<div class="notification-preview-img">\n' +
                                    '<div class="img" style="background: rgb(255, 255, 255);">\n' +
                                    '<svg class="svg-inline--fa fa-bullhorn fa-w-18" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bullhorn" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg="">\n' +
                                    '<path fill="currentColor" d="M576 240c0-23.63-12.95-44.04-32-55.12V32.01C544 23.26 537.02 0 512 0c-7.12 0-14.19 2.38-19.98 7.02l-85.03 68.03C364.28 109.19 310.66 128 256 128H64c-35.35 0-64 28.65-64 64v96c0 35.35 28.65 64 64 64h33.7c-1.39 10.48-2.18 21.14-2.18 32 0 39.77 9.26 77.35 25.56 110.94 5.19 10.69 16.52 17.06 28.4 17.06h74.28c26.05 0 41.69-29.84 25.9-50.56-16.4-21.52-26.15-48.36-26.15-77.44 0-11.11 1.62-21.79 4.41-32H256c54.66 0 108.28 18.81 150.98 52.95l85.03 68.03a32.023 32.023 0 0 0 19.98 7.02c24.92 0 32-22.78 32-32V295.13C563.05 284.04 576 263.63 576 240zm-96 141.42l-33.05-26.44C392.95 311.78 325.12 288 256 288v-96c69.12 0 136.95-23.78 190.95-66.98L480 98.58v282.84z"></path>\n' +
                                    "</svg>\n" +
                                    "</div>\n" +
                                    "</div>";
                            }
                        }
                    });
                    if (data.notificationData[0] != undefined) {
                        var recentActivityCount = 0;
                        function recentActivityNotificationFunction() {
                            if (recentActivityCount == data.recentNotificationMessage.length) {
                                recentActivityCount = 0;
                            }
                            var str = "Anonymous";
                            var imgVar =
                                '<svg style="border-radius: 50%;" width="54px" height="54px" viewBox="0 0 140 140" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n' +
                                '<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\n' +
                                '<g id="Group" transform="translate(-30.000000, -30.000000)">\n' +
                                '<circle id="Oval" fill="#E3F2FD" cx="100" cy="100" r="100"></circle> \n' +
                                '<circle id="Oval" fill="#02ced14d" cx="100" cy="100" r="75"></circle> \n' +
                                '<circle id="Oval" fill="#02ced166" cx="100" cy="100" r="50"></circle> \n' +
                                '<circle id="Oval" fill="#54ced0" cx="100" cy="100" r="25"></circle>\n' +
                                "</g>\n" +
                                "</g>\n" +
                                "</svg>";
                            var cityName = data.recentNotificationMessage[recentActivityCount].city;
                            var countryName = data.recentNotificationMessage[recentActivityCount].country;
                            if (data.recentNotificationMessage.length) {
                                if (data.recentNotificationMessage[recentActivityCount].first_name != null && data.recentNotificationMessage[recentActivityCount].first_name != "") {
                                    str = data.recentNotificationMessage[recentActivityCount].first_name;
                                }
                                if (data.recentNotificationMessage[recentActivityCount].city != null && data.recentNotificationMessage[recentActivityCount].city != "") {
                                    str = str + " from " + cityName;
                                    if (data.recentNotificationMessage[recentActivityCount].country != null && data.recentNotificationMessage[recentActivityCount].country != "") {
                                        str = str + ", ";
                                    }
                                    imgVar = '<img src="https://staging-app.marketermagic.com/images/map.png ">';
                                }
                                if (data.recentNotificationMessage[recentActivityCount].country != null && data.recentNotificationMessage[recentActivityCount].country != "") {
                                    if (data.recentNotificationMessage[recentActivityCount].city == null || data.recentNotificationMessage[recentActivityCount].city == "") {
                                        str = str + " from ";
                                    }
                                    str = str + countryName;
                                    imgVar = '<img src="https://staging-app.marketermagic.com/images/map.png ">';
                                }
                            }
                            if (str != null && str.length > 10) str = str.substring(0, 40);
                            if (str == null) str = "Anonymous";
                            var clickProofPopupModalTmp = document.createElement("div");
                            catchHover(clickProofPopupModalTmp);
                            clickProofPopupModalTmp.setAttribute("id", "click-proof-popup-modal-tmp");
                            document.body.appendChild(clickProofPopupModalTmp);
                            document.getElementById("click-proof-popup-modal-tmp").innerHTML =
                                "\n" +
                                '<div id="click-proof-popup-modal" class="click-proof-popup-modal">\n' +
                                '<div class="click-proof-circle-recent">\n' +
                                imgVar +
                                "</div>\n" +
                                '<div class="click-proof-text-block">\n' +
                                '<p class="click-proof-num" maxlength="10">\n' +
                                "<span>" +
                                str +
                                "</span>\n" +
                                "</p>\n" +
                                "<p>" +
                                recentActivityMessage +
                                "</p>\n" +
                                '<p class="verified">\n' +
                                '<span class="activity-timing">' +
                                data.recentNotificationMessage[recentActivityCount].created_at +
                                "</span>\n" +
                                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                                '<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9914 6.10833L13.8093 7.39848C13.9208 7.57456 13.8922 7.80448 13.742 7.94879L12.6398 9.00579L12.7636 10.5275C12.7803 10.7359 12.6489 10.9265 12.4491 10.9841L10.9818 11.4068L10.3847 12.8127C10.3034 13.0044 10.0971 13.1137 9.89414 13.0706L8.39722 12.7637L7.21583 13.7313C7.13507 13.7965 7.03707 13.8304 6.93853 13.8304C6.83999 13.8304 6.74145 13.7965 6.66122 13.7313L5.47983 12.7637L3.98291 13.0706C3.77937 13.1148 3.57422 13.0039 3.49237 12.8127L2.89522 11.4068L1.42791 10.9841C1.22814 10.9259 1.09676 10.7359 1.11345 10.5275L1.2373 9.00579L0.135066 7.94879C-0.0151652 7.80448 -0.0437037 7.57456 0.0677579 7.39848L0.885143 6.10779L0.399989 4.65987C0.334296 4.46225 0.416681 4.24525 0.597066 4.14187L1.9206 3.37887L2.16399 1.87118C2.19737 1.66548 2.3713 1.51202 2.5786 1.50395L4.10514 1.44418L5.02107 0.221869C5.14653 0.0554841 5.3716 2.25194e-05 5.55899 0.0888687L6.93853 0.745253L8.31753 0.0894071C8.50437 -0.000515942 8.73053 0.0549456 8.85545 0.221869L9.77137 1.44418L11.2979 1.50395C11.5058 1.51256 11.6791 1.66602 11.7131 1.87171L11.9565 3.37941L13.28 4.14241C13.4604 4.24579 13.5422 4.46279 13.4765 4.66041L12.9914 6.10833ZM7.03868 9.88348L10.1031 5.29256C10.2242 5.1111 10.1779 4.86179 9.9986 4.73795L9.3476 4.29048C9.16883 4.16718 8.92276 4.21348 8.8016 4.39602L6.38714 8.01341L4.92307 6.52618C4.77068 6.37218 4.52137 6.37218 4.36791 6.52618L3.81276 7.09156C3.6593 7.24771 3.6593 7.50079 3.81276 7.65695L6.06245 9.94271C6.18899 10.0698 6.38768 10.1694 6.56537 10.1694C6.7436 10.1694 6.92291 10.0547 7.03868 9.88348Z" fill="#1B85FF"></path>\n' +
                                "</svg> \n" +
                                '<span><a href="https://staging-app.marketermagic.com/verify/74b43715-a14-53b5b/' +
                                site_url +
                                '" id="verify-by-marketermagic-btn" target="_blank" >verified by MarketerMagicâ„¢</a></span>\n' +
                                "</p>\n" +
                                "</div>\n" +
                                '<div class="click-proof-close" id="close-look-live">\n' +
                                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n' +
                                '<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z"></path>\n' +
                                "</svg>\n" +
                                "</div>\n" +
                                "</div>";
                            recentActivityCount++;
                            document.getElementById("verify-by-marketermagic-btn").onclick = function () {
                                catchClickVisitor();
                            };
                            document.getElementById("close-look-live").onclick = function () {
                                var closebutton = document.getElementById("click-proof-popup-modal");
                                closebutton.classList.add("bounceBottom-leave");
                                window.setTimeout(function () {
                                    document.getElementById("click-proof-popup-modal").style.display = "none";
                                    const clickProofPopupModal = document.getElementsByClassName("click-proof-popup-modal");
                                    while (clickProofPopupModal.length > 0) clickProofPopupModal[0].remove();
                                    document.getElementById("click-proof-popup-modal-tmp").remove();
                                }, 145);
                                clearInterval(clickProofFunctionCallInterval);
                                clearTimeout(popUpCloseSetTime);
                            };
                            document.getElementById("click-proof-popup-modal").style.display = "block";
                            catchImpression();
                            var popUpCloseSetTime = window.setTimeout(function () {
                                var addBounceBottomleaveClass = document.getElementById("click-proof-popup-modal");
                                if (addBounceBottomleaveClass != null) {
                                    addBounceBottomleaveClass.classList.add("bounceBottom-leave");
                                }
                                window.setTimeout(function () {
                                    var clickProofPopupModalDisplayNone = document.getElementById("click-proof-popup-modal");
                                    if (clickProofPopupModalDisplayNone != null) {
                                        document.getElementById("click-proof-popup-modal").style.display = "none";
                                    }
                                    const clickProofPopupModal = document.getElementsByClassName("click-proof-popup-modal");
                                    while (clickProofPopupModal.length > 0) clickProofPopupModal[0].remove();
                                    document.getElementById("click-proof-popup-modal-tmp").remove();
                                }, 190);
                            }, 5000);
                        }
                        function visitorNotificationFunction() {
                            var clickProofPopupModalTmp = document.createElement("div");
                            catchHover(clickProofPopupModalTmp);
                            clickProofPopupModalTmp.setAttribute("id", "click-proof-popup-modal-tmp");
                            document.body.appendChild(clickProofPopupModalTmp);
                            document.getElementById("click-proof-popup-modal-tmp").innerHTML =
                                "\n" +
                                '<div id="click-proof-popup-modal" class="click-proof-popup-modal">\n' +
                                live_custom_image +
                                '<div class="click-proof-text-block">\n' +
                                '<p class="click-proof-num">\n' +
                                '<span id="incUserCount">' +
                                data.userCount +
                                "</span>&nbsp;Live Visitors\n" +
                                "</p>\n" +
                                "<p>" +
                                liveVisitorMessage +
                                "</p>\n" +
                                '<p class="verified">\n' +
                                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                                '<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9914 6.10833L13.8093 7.39848C13.9208 7.57456 13.8922 7.80448 13.742 7.94879L12.6398 9.00579L12.7636 10.5275C12.7803 10.7359 12.6489 10.9265 12.4491 10.9841L10.9818 11.4068L10.3847 12.8127C10.3034 13.0044 10.0971 13.1137 9.89414 13.0706L8.39722 12.7637L7.21583 13.7313C7.13507 13.7965 7.03707 13.8304 6.93853 13.8304C6.83999 13.8304 6.74145 13.7965 6.66122 13.7313L5.47983 12.7637L3.98291 13.0706C3.77937 13.1148 3.57422 13.0039 3.49237 12.8127L2.89522 11.4068L1.42791 10.9841C1.22814 10.9259 1.09676 10.7359 1.11345 10.5275L1.2373 9.00579L0.135066 7.94879C-0.0151652 7.80448 -0.0437037 7.57456 0.0677579 7.39848L0.885143 6.10779L0.399989 4.65987C0.334296 4.46225 0.416681 4.24525 0.597066 4.14187L1.9206 3.37887L2.16399 1.87118C2.19737 1.66548 2.3713 1.51202 2.5786 1.50395L4.10514 1.44418L5.02107 0.221869C5.14653 0.0554841 5.3716 2.25194e-05 5.55899 0.0888687L6.93853 0.745253L8.31753 0.0894071C8.50437 -0.000515942 8.73053 0.0549456 8.85545 0.221869L9.77137 1.44418L11.2979 1.50395C11.5058 1.51256 11.6791 1.66602 11.7131 1.87171L11.9565 3.37941L13.28 4.14241C13.4604 4.24579 13.5422 4.46279 13.4765 4.66041L12.9914 6.10833ZM7.03868 9.88348L10.1031 5.29256C10.2242 5.1111 10.1779 4.86179 9.9986 4.73795L9.3476 4.29048C9.16883 4.16718 8.92276 4.21348 8.8016 4.39602L6.38714 8.01341L4.92307 6.52618C4.77068 6.37218 4.52137 6.37218 4.36791 6.52618L3.81276 7.09156C3.6593 7.24771 3.6593 7.50079 3.81276 7.65695L6.06245 9.94271C6.18899 10.0698 6.38768 10.1694 6.56537 10.1694C6.7436 10.1694 6.92291 10.0547 7.03868 9.88348Z" fill="#1B85FF"></path>\n' +
                                "</svg> \n" +
                                '<span><a href="https://staging-app.marketermagic.com/verify/74b43715-a14-53b5b/' +
                                site_url +
                                '" id="verify-by-marketermagic-btn" target="_blank" >verified by MarketerMagicâ„¢</a></span>\n' +
                                "</p>\n" +
                                "</div>\n" +
                                '<div class="click-proof-close" id="close-look-live">\n' +
                                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n' +
                                '<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z"></path>\n' +
                                "</svg>\n" +
                                "</div>\n" +
                                "</div>";
                            var userCount = data.userCount;
                            document.getElementById("verify-by-marketermagic-btn").onclick = function () {
                                catchClickVisitor();
                            };
                            document.getElementById("close-look-live").onclick = function () {
                                var closebutton = document.getElementById("click-proof-popup-modal");
                                closebutton.classList.add("bounceBottom-leave");
                                window.setTimeout(function () {
                                    document.getElementById("click-proof-popup-modal").style.display = "none";
                                    const clickProofPopupModal = document.getElementsByClassName("click-proof-popup-modal");
                                    while (clickProofPopupModal.length > 0) clickProofPopupModal[0].remove();
                                    document.getElementById("click-proof-popup-modal-tmp").remove();
                                }, 145);
                                clearInterval(clickProofFunctionCallInterval);
                                clearTimeout(popUpCloseSetTime);
                            };
                            document.getElementById("click-proof-popup-modal").style.display = "block";
                            catchImpression();
                            var popUpCloseSetTime = window.setTimeout(function () {
                                var addBounceBottomleaveClass = document.getElementById("click-proof-popup-modal");
                                if (addBounceBottomleaveClass != null) {
                                    addBounceBottomleaveClass.classList.add("bounceBottom-leave");
                                }
                                window.setTimeout(function () {
                                    var clickProofPopupModalDisplayNone = document.getElementById("click-proof-popup-modal");
                                    if (clickProofPopupModalDisplayNone != null) {
                                        document.getElementById("click-proof-popup-modal").style.display = "none";
                                    }
                                    const clickProofPopupModal = document.getElementsByClassName("click-proof-popup-modal");
                                    while (clickProofPopupModal.length > 0) clickProofPopupModal[0].remove();
                                    document.getElementById("click-proof-popup-modal-tmp").remove();
                                }, 190);
                            }, 5000);
                        }
                        function customNotificationFunction() {
                            var clickProofPopupModalTmp = document.createElement("div");
                            catchHover(clickProofPopupModalTmp);
                            clickProofPopupModalTmp.setAttribute("id", "click-proof-popup-modal-tmp");
                            document.body.appendChild(clickProofPopupModalTmp);
                            document.getElementById("click-proof-popup-modal-tmp").innerHTML =
                                "\n" +
                                '<div style="padding: 3px 24px;" id="click-proof-popup-modal" class="click-proof-popup-modal click-proof-static-popup">' +
                                custom_image +
                                '<div class="click-proof-text-block1">\n' +
                                '<p style="display:none;" class="click-proof-num"></p>\n' +
                                "<p>" +
                                staticMessage +
                                "</p>\n" +
                                '<p class="verified">\n' +
                                '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
                                '<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9914 6.10833L13.8093 7.39848C13.9208 7.57456 13.8922 7.80448 13.742 7.94879L12.6398 9.00579L12.7636 10.5275C12.7803 10.7359 12.6489 10.9265 12.4491 10.9841L10.9818 11.4068L10.3847 12.8127C10.3034 13.0044 10.0971 13.1137 9.89414 13.0706L8.39722 12.7637L7.21583 13.7313C7.13507 13.7965 7.03707 13.8304 6.93853 13.8304C6.83999 13.8304 6.74145 13.7965 6.66122 13.7313L5.47983 12.7637L3.98291 13.0706C3.77937 13.1148 3.57422 13.0039 3.49237 12.8127L2.89522 11.4068L1.42791 10.9841C1.22814 10.9259 1.09676 10.7359 1.11345 10.5275L1.2373 9.00579L0.135066 7.94879C-0.0151652 7.80448 -0.0437037 7.57456 0.0677579 7.39848L0.885143 6.10779L0.399989 4.65987C0.334296 4.46225 0.416681 4.24525 0.597066 4.14187L1.9206 3.37887L2.16399 1.87118C2.19737 1.66548 2.3713 1.51202 2.5786 1.50395L4.10514 1.44418L5.02107 0.221869C5.14653 0.0554841 5.3716 2.25194e-05 5.55899 0.0888687L6.93853 0.745253L8.31753 0.0894071C8.50437 -0.000515942 8.73053 0.0549456 8.85545 0.221869L9.77137 1.44418L11.2979 1.50395C11.5058 1.51256 11.6791 1.66602 11.7131 1.87171L11.9565 3.37941L13.28 4.14241C13.4604 4.24579 13.5422 4.46279 13.4765 4.66041L12.9914 6.10833ZM7.03868 9.88348L10.1031 5.29256C10.2242 5.1111 10.1779 4.86179 9.9986 4.73795L9.3476 4.29048C9.16883 4.16718 8.92276 4.21348 8.8016 4.39602L6.38714 8.01341L4.92307 6.52618C4.77068 6.37218 4.52137 6.37218 4.36791 6.52618L3.81276 7.09156C3.6593 7.24771 3.6593 7.50079 3.81276 7.65695L6.06245 9.94271C6.18899 10.0698 6.38768 10.1694 6.56537 10.1694C6.7436 10.1694 6.92291 10.0547 7.03868 9.88348Z" fill="#1B85FF"></path>\n' +
                                "</svg> \n" +
                                '<span><a href="https://staging-app.marketermagic.com/verify/74b43715-a14-53b5b/' +
                                site_url +
                                '" id="verify-by-marketermagic-btn" target="_blank" >verified by MarketerMagicâ„¢</a></span>\n' +
                                "</p>\n" +
                                "</div>\n" +
                                '<div class="click-proof-close" id="close-look-static">\n' +
                                '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">\n' +
                                '<path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm4.597 17.954l-4.591-4.55-4.555 4.596-1.405-1.405 4.547-4.592-4.593-4.552 1.405-1.405 4.588 4.543 4.545-4.589 1.416 1.403-4.546 4.587 4.592 4.548-1.403 1.416z"></path>\n' +
                                "</svg>\n" +
                                "</div>\n" +
                                "</div>";
                            document.getElementById("verify-by-marketermagic-btn").onclick = function () {
                                catchClickVisitor();
                            };
                            document.getElementById("close-look-static").onclick = function () {
                                var closebutton = document.getElementById("click-proof-popup-modal");
                                closebutton.classList.add("bounceBottom-leave");
                                window.setTimeout(function () {
                                    document.getElementById("click-proof-popup-modal").style.display = "none";
                                    const clickProofPopupModal = document.getElementsByClassName("click-proof-popup-modal");
                                    while (clickProofPopupModal.length > 0) clickProofPopupModal[0].remove();
                                    document.getElementById("click-proof-popup-modal-tmp").remove();
                                }, 145);
                                clearInterval(clickProofFunctionCallInterval);
                                clearTimeout(popUpCloseSetTime);
                            };
                            document.getElementById("click-proof-popup-modal").style.display = "block";
                            catchImpression();
                            var popUpCloseSetTime = window.setTimeout(function () {
                                var addBounceBottomleaveClass = document.getElementById("click-proof-popup-modal");
                                if (addBounceBottomleaveClass != null) {
                                    addBounceBottomleaveClass.classList.add("bounceBottom-leave");
                                }
                                window.setTimeout(function () {
                                    var clickProofPopupModalDisplayNone = document.getElementById("click-proof-popup-modal");
                                    if (clickProofPopupModalDisplayNone != null) {
                                        document.getElementById("click-proof-popup-modal").style.display = "none";
                                    }
                                    const clickProofPopupModal = document.getElementsByClassName("click-proof-popup-modal");
                                    while (clickProofPopupModal.length > 0) clickProofPopupModal[0].remove();
                                    document.getElementById("click-proof-popup-modal-tmp").remove();
                                }, 190);
                            }, 5000);
                        }
                        var arr = [];
                        if (data.defaultUserCount != 0) {
                            data.userCount = parseInt(data.defaultUserCount) + parseInt(data.userCount);
                        }
                        var clickProofFunctionCallInterval = setInterval(function () {
                            if (!arr.length) {
                                var notificationDataArray = data.notificationData;
                                notificationDataArray.forEach(function (value, key) {
                                    if (value.notify_id == 1 && data.recentNotificationMessage.length != 0) {
                                        arr[key] = 1;
                                    }
                                    if (value.notify_id == 2 && data.userCount > 1) {
                                        arr[key] = 2;
                                    }
                                    if (value.notify_id == 3) {
                                        arr[key] = 3;
                                    }
                                });
                            }
                            var func = arr[0];
                            if (func == undefined) {
                                arr.splice(0, 1);
                                func = arr[0];
                                if (func == undefined) {
                                    arr.splice(0, 1);
                                    func = arr[0];
                                }
                            }
                            if (func != undefined) {
                                if (func == 1) {
                                    recentActivityNotificationFunction();
                                }
                                if (func == 2) {
                                    visitorNotificationFunction();
                                }
                                if (func == 3) {
                                    customNotificationFunction();
                                }
                            }
                            arr.splice(0, 1);
                        }, 8000);
                    } else {
                        console.log("Campaign paused/not published");
                    }
                } else {
                    console.log("no data found");
                }
            }
        };
        xhttp.open("POST", "https://staging-app.marketermagic.com/api/getcampaigndata", !0);
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhttp.send("currentLocation=" + current_location + "&campaignToken=" + campaignToken + "&projectToken=" + projectToken);
    }
    callAjax("data");
    function catchHover(e) {
        e.addEventListener(
            "mouseenter",
            function (e) {
                if (0 == catch_hover) {
                    catch_hover = !0;
                    var n = new XMLHttpRequest();
                    (n.onreadystatechange = function () {
                        catch_hover = !1;
                    }),
                        n.open("POST", "https://staging-app.marketermagic.com/api/catchhovernotification", !0),
                        n.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
                        n.send("currentLocation=" + current_location + "&campaignToken=" + campaignToken + "&projectToken=" + projectToken);
                }
            },
            !1
        );
    }
    function catchImpression() {
        var o = new XMLHttpRequest();
        (o.onreadystatechange = function () {
            catch_hover = !1;
        }),
            o.open("POST", "https://staging-app.marketermagic.com/api/catchImpressionNoti", !0),
            o.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            o.send("currentLocation=" + current_location + "&campaignToken=" + campaignToken + "&projectToken=" + projectToken);
    }
    function catchClickVisitor() {
        var e = new XMLHttpRequest();
        (e.onreadystatechange = function () {
            catch_hover = !1;
        }),
            e.open("POST", "https://staging-app.marketermagic.com/api/catchClickVisitor", !0),
            e.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
            e.send("currentLocation=" + current_location + "&campaignToken=" + campaignToken + "&projectToken=" + projectToken);
    }
});
