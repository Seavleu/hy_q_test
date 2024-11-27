import routes from '@/router'

let socket = null
let interval = null

const timer = 10000
const ws = 'ws://dev.recs.kr:8480/ws/api'

const sockets = {
    set: (val) => {
        socket = val
    },
    get: () => {
        return {
            socket,
            interval
        }
    },
    send: (data) => {
        socket.value.send(JSON.stringify(data))
    },
    interval: (data) => {
        /**
         * 소켓이 연결되기전 send 요청이 오면 연결 되었는지 0.01초 간격으로 체크하여 연결되면 send날림- _-;;
        */
        if (socket.value.readyState === 0) {
            setTimeout(() => {
                sockets.interval(data)
            }, 10)
            return false
        }
        // 휴먼 실수 방지 코드
        if (interval) {
            clearInterval(interval)
        }
        socket.value.send(JSON.stringify(data))
        interval = setInterval(() => {
            /**
             * 로그아웃하면 컨포넌트를 한번 더 호출하고 넘어가는 이슈가있어 방어 처림함.
             * 이슈 페이지: Main
             */
            if (socket && routes.currentRoute._value.name !== 'login') {
                socket.value.send(JSON.stringify(data))
            } else {
                clearInterval(interval)
            }
        }, timer)
    },
    clear: () => {
        clearInterval(interval)
        interval = null
    }
}
export {
    ws,
    sockets
}
