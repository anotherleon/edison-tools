type Options = {
    url: string,
    method?: "GET" | "POST",
    data?: {},
    timeout?: 60,
}

function http(options:Options) {
    options.method = options.method || "GET";
    const paramString = formatParams(options.data);

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.timeout = (options.timeout || 60) * 1000;

        if (options.method === "GET") {
            let url = options.url + (options.url.indexOf("?") > -1 ? "&" : "?") + paramString;
            xhr.open("GET", url);
            // xhr.setRequestHeader("User-Agent", "Mozilla/5.0 (Linux; X11)");
            xhr.send(null);
        }

        if (options.method === "POST") {
            xhr.open("POST", options.url);
            // 设置请求头
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // 跨域携带cookie
            // xhr.withCredentials = true;
            xhr.send(paramString);
        }

        xhr.onload = function () {
            const result = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: xhr.getAllResponseHeaders(),
                data: xhr.response || xhr.responseText,
            };
            if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                resolve(result);
            } else {
                reject(result);
            }
        };
        // 错误处理
        xhr.onerror = function () {
            // reject(new TypeError("请求出错"));
        };
        xhr.ontimeout = function () {
            // reject(new TypeError("请求超时"));
        };
        xhr.onabort = function () {
            reject(new TypeError("请求被终止"));
        };
    });
}

function formatParams(data?: {[key:string]:string}) {
    let arr = [];
    for (let key in data) {
        if (data.hasOwnProperty(key)) arr.push(encodeURIComponent(key) + "=" + encodeURIComponent(data[key]));
    }
    return arr.join("&");
}

export default http;
