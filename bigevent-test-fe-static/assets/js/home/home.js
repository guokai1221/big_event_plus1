//获取实时天气
var x = new XMLHttpRequest();
x.open("GET", "https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=0e825ecde2ea41f5ab7c425eee478fbe");
x.send();
x.onload = function () {
    console.log(x.response)
    var res = JSON.parse(x.response);
    var basic = res['HeWeather6'][0]['basic'];
    var now = res['HeWeather6'][0]['now'];
    var pos = basic.cnty + ',' + basic.admin_area + ',' + basic.parent_city;
    document.querySelector(".pos-text").innerText = pos;

    document.querySelector(".temp").innerText = now.tmp + '°';
    document.querySelector(".now-temp-box .icon").classList.add("icon-" + now.cond_code);
    document.querySelector(".now-text").innerText = now.cond_txt;
    document.querySelector(".last-update-time").innerText = res['HeWeather6'][0]['update'].loc + "更新数据！";
    document.querySelector(".hum-text").innerText = "湿度" + now.hum + "%";
    document.querySelector(".wind-text").innerText = now.wind_dir + " 风力" + now.wind_sc + "级";
}

//获取未来7天天气
var x2 = new XMLHttpRequest();
x2.open("GET", "https://free-api.heweather.net/s6/weather/forecast?location=auto_ip&key=0e825ecde2ea41f5ab7c425eee478fbe");
x2.send();
x2.onload = function () {
    var res = JSON.parse(x2.response);
    var data = res['HeWeather6'][0].daily_forecast;

    var html = "";
    for (var i = 0; i < data.length; i++) {
        html += `<li>
                    <div class="time">${data[i].date}</div>
                    <span class="icon iconfont icon-${data[i].cond_code_d}"></span>
                    <div class="tmp-box">
                        <span class="max">${data[i].tmp_max}°</span>
                        /
                        <span class="min">${data[i].tmp_min}°</span>
                    </div>
                </li>`;
    }
    document.querySelector(".future-list").innerHTML = html;
}