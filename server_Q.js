const http = require("http")
const _________ = require("uuid") //引入 uuid套件
const _________ = require(_________)  //引入 errorHandle.js

var todos = []

// requestLintner 是一個事件處理器，由request觸發
// 進一步透過傳遞(req,res)來處理需求
const requestLintner = (req,res) => {
    const headers = {
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
        'Content-Type': 'application/json'
    }
    let body = ""

    // 收到請求時，觸發"data"事件
    _________.on('data', chunk => {
        body += chunk
    })

    // 取得所有代辦事項
    if(req._________ == '/todos' && req._________ == 'GET'){
        res.writeHead(200,headers)
        res.write(JSON.stringify({
            "ststus": "success",
            "data": todos
        }))
        res.end()
    // 新增單筆代辦事項
    }else if(req.url == '/todos' && req.method == 'POST'){
        // 請求完全輸出時，觸發"end"事件
        req.on(_________,() => {
            // 因為body是字串型態，所以要先轉為Json格式，再取其title
            const title = JSON._________
            try{
                if (title !== undefined){
                    const todo = {
                        "title": title,
                        "id": uuidv4()
                    }
                    // 新增資料到todos中
                    todos._________(todo)
                    /**
                     * 成功後需要回傳狀態碼
                     * _________
                     */
                }else{
                    // 呼叫異常處理function
                    _________  
                }
            }catch{
                // 呼叫異常處理function
                _________
            }
        })
    // 刪除全部代辦事項
    }else if(req.url == '/todos' && req.method == 'DELETE'){
        _________ // 清空array
        res.writeHead(200,headers)
        res.write(JSON.stringify({
            "ststus": "success",
            "data": todos
        }))
        res.end()
    // 刪除單筆代辦事項
    // 確認開頭是 '/todos/'的部分
    }else if(req.url._________('/todos/') && req.method == 'DELETE'){
        // 確認開頭後確認想刪除的id位置
        const id = req.url._________
        // 透過此id去確認todos中是否有此id，並且確認其index
        const index = todos._________
        // 如果不是找不到的情況，就去做以下處理
        if(index !== _________){
            // 透過index，刪除既有元素
            todos._________
            res.writeHead(200,headers)
            res.write(JSON.stringify({
                "ststus": "success",
                "data": todos
            }))
            res.end()
        }else{
            errorHandle(res)
        }
    // 修改單筆代辦事項
    }else if(req.url.startsWith('/todos/') && req.method == 'PATCH'){
        // 請求完全輸出時，觸發"end"事件
        _________._________('end',() => {
            try{
                /**
                 * 完成此處的url解析
                 * 找到修改對象的位置、
                 * _________
                 * _________
                 */

                if (title !== _________ && index !== _________){
                    _________ //處理todos，取代原本的title
                    res.writeHead(200,headers)
                    res.write(JSON.stringify({
                        "ststus": "success",
                        "data": todos
                    }))
                    res.end()
                }else{
                    errorHandle(res)   
                }
            }catch{
                errorHandle(res)
            }
        })
    }else if(req.method == 'OPTIONS'){
        res.writeHead(200, headers)
        res.end()
    }else{
        res.writeHead(200, headers)
        res.write(JSON.stringify({
            "ststus": "false",
            "message": "無此網站路由"
        }))
        res.end() 
    }
}
// 建立server，並傳入事件處理器-requestLintner來處理各種request需求
const server = http._________(requestLintner)
// 監聽指定的port 等待request進來
server.listen(process.env.PORT || 3000)