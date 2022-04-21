function noop() { }
class CustomPromise {
    constructor(executor) {
        this.queue = []
        this.errorHandler = noop
        this.finallyHandler = noop
        try {
            executor.call(null, this.onResolve.bind(this), this.onReject.bind(this))
        } catch (e) {
            console.log("Error was catched");
            this.errorHandler(e)
        } finally {
            this.finallyHandler()
        }
    }

    onResolve(data) {
        this.queue.forEach(callback => {
            data = callback(data)
        })
        this.finallyHandler()
    }

    onReject(error) {
        this.errorHandler(error)
        this.finallyHandler()
    }

    then(fn) {
        this.queue.push(fn)
        return this
    }
    catch(fn) {
        this.errorHandler = fn
        return this
    } finally(fn) {
        this.finallyHandler = fn
        return this
    }
}
//const promise = new CustomPromise((resolve, reject) => {
//  setTimeout(() => {
//    reject("Type some Error")
//  }, 1000);
//})
//promise.then((result) => {
//  console.log(result);
//}).catch((error) => {
//  console.log(error);
//}).finally(() => console.log("Finally"))

const requestedURL = "https://jsonplaceholder.typicode.com/users";

function ajax(URL, body = null) {
    return new CustomPromise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(body.type, URL);
        xhr.responseType = "json";
        if (body.headers != undefined) {
            xhr.setRequestHeader("content-type", body.headers.content_type);
        }

        xhr.onload = function () {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };

        xhr.onerror = function () {
            reject(xhr.response);
        };
        if (body.type == "GET") {
            xhr.send();
        } else {
            xhr.send(JSON.stringify(body.data));
        }

    })
}

const p1 = ajax(requestedURL, {
    type: "POST",
    headers: {
        content_type: "application/json"
    },

    data: {
        first_name: "Haykaram",
        last_name: "Khachatryan"
    }

}).then((response) => console.log(response)).catch((error) => console.log(error))

const p2 = ajax(requestedURL, {
    type: "GET",
    headers: {
        content_type: "application/json"
    }
}).then((response) => console.log(response)).catch((error) => console.log(error))

const p3 = ajax(requestedURL, {
    type: "GET"
}).then((response) => console.log(response)).catch((error) => console.log(error))
