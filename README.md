# pm_common
## Context 
- 作為全域物件使用
- setUp階段後應該包含所有test所需資料，供後續function使用
- 常用資料持續擴充

## TestCase
- 預先定義的template
- 可繼承TestCase後覆寫所需的function
- 主要覆寫function: setUp、main(自訂名稱)、unexpected、tearDown
- 可用super關鍵字存取父親的data和method

## Utils
- 工具函式庫
- 共用function持續擴充

預設Http狀態Selecter實作
1.  先設定變數expectedCode表明此次測試預期回傳的response狀態。
2.	視需要傳入環境物件，物件應包含選擇邏輯所需資訊。
3.	Selecter將會跟據實際回傳的status text + 預期設定的expected code 組成之後會呼叫的main function name回傳
4.  實作的main function名稱要與對應預期selecter回傳的字串一樣，所以要以字串”expect” + expected status + expected code，同樣下底線隔開各單字，統一     小寫，ex: expect _ok_200(預期發生狀態200), expect _bad_request_400(預期發生狀態400)
    


使用方式 : 複製貼上Postman變數欄位XD
