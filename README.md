# pm_common
## Context 
- global object
- setUp階段後應該包含所有test所需資料，供後續function使用
- 常用資料持續擴充

## TestCase
- 提供預先定義的template方法
- 可繼承TestCase後覆寫所需的method
- run()會依序呼叫setUp、main or unexpected、tearDown
- 可用super關鍵字存取父親的已定義的data和已實作的method
- 宣告且實作main(自訂名稱)

## Utils
- 當作工具函式庫
- 共用function持續擴充

## Tests
- global object
- 提供測試方法並存放測試結果
- TestCase的run()跑完後會呼叫此物件輸出結果

## Selecter
- 存放不同測試路徑分支選擇的方法
- 方法執行最後需要回傳要被選擇的function name字串

預設Http狀態Selecter實作
1.  先設定變數expectedCode表明此次測試預期回傳的response狀態。
2.	視需要傳入環境物件，物件應包含選擇邏輯所需資訊。
3.	Selecter將會跟據實際回傳的status text + 預期設定的expected code 組成之後呼叫的main function name回傳
4.  實作的main function名稱要與對應預期selecter回傳的字串一樣，故要以字串”expect” + expected status + expected code定名，同樣下底線隔開各單字，統     一小寫，ex: expect_ok_200(預期發生狀態200), expect_bad_request_400(預期發生狀態400)
    


使用方式 : 複製貼上Postman變數欄位XD
