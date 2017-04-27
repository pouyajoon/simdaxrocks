const futch = (url, opts, onProgress) => {
    return new Promise((res, rej) => {
        const headers = opts.headers || {};
        const method = opts.method || 'POST';
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        for (let k in headers) {
            if (headers[k]) {
                xhr.setRequestHeader(k, headers[k]);
            }
        }
        xhr.onload = e => res(e.target);
        xhr.onerror = rej;
        if (xhr.upload && onProgress) {
            xhr.upload.onprogress = onProgress;
            xhr.send(opts.body);
        }
    });
}
