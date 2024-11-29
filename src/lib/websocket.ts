import routes from '@/router'

let socket: WebSocket | null = null
let interval: number | undefined

const timer = 10000
const ws = 'ws://dev.recs.kr:8480/ws/api'

type DataTypeStringAny = Record<string, any>

const isSocketReady = (): boolean => {
    return socket !== null && socket.readyState === WebSocket.OPEN
}

const sockets = {
    set: (val: WebSocket) => {
        socket = val
    },
    get: () => {
        return {
            socket,
            interval
        }
    },
    send: (data: DataTypeStringAny) => {
        if (isSocketReady()) {
            socket!.send(JSON.stringify(data))
        } else {
            console.error('Socket is not ready to send data ~UwU~')
        }
    },
    interval: (data: DataTypeStringAny) => {
        /**
         * 소켓이 연결되기전 send 요청이 오면 연결 되었는지 0.01초 간격으로 체크하여 연결되면 send날림- _-;;
        */
        if (socket  && socket.readyState === WebSocket.CONNECTING) {
            setTimeout(() => {
                sockets.interval(data)
            }, 10)
            return false
        }
        // 휴먼 실수 방지 코드
        if (interval) {
            clearInterval(interval)
        }

        // 초기 데이터 보내기
        if  ( isSocketReady() ) {
            socket!.send(JSON.stringify(data))
        }

        interval = setInterval(() => {
            /**
             * 로그아웃하면 컨포넌트를 한번 더 호출하고 넘어가는 이슈가있어 방어 처림함.
             * 이슈 페이지: Main
             */
            if (socket && routes.currentRoute.value.name !== 'auth') {
                if (isSocketReady()) {
                    socket!.send(JSON.stringify(data))
                } else {
                    console.error('Socket is not ready during interval ~UwU~')
                }
            } else {
                clearInterval(interval) 
                interval = undefined
            }
        }, timer)
    },
    clear: () => {
        if (interval) {
            clearInterval(interval)   
            /**
             * interval을 해제한 후, 변수 재사용으로 인한 잠재적 문제를 방지하기 위해
             * interval을 undefined로 명시적으로 설정합니다.
             */ 
            interval = undefined  
        }
    }
}
export {
    ws,
    sockets
}
