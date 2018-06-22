# pm_common
可參考example.js
## TestContext 
- 傳入TestTemplate建構式
- setup階段後應該包含所有test所需資料，供後續function共享使用
- 持續擴充常用資料
- 在class裡面使用this.context可取得reference
- ex. this.context.responseText 取得回應的body字串

## TestTemplate
- 提供預先定義的template方法
- 使用者繼承此TestTemplate後覆寫所需的method
- run()會依序呼叫setUp、mainTest(自訂名稱) or unexpected、tearDown
- 可用super關鍵字存取父親的已定義的data和已實作的method
- 宣告且實作mainTest(自訂名稱)

## Utils
- 當作工具函式庫
- 持續擴充共用function

## Tests
- global object
- 提供測試方法並存放測試結果
- TestCase的run()跑完後會呼叫此物件輸出結果

## TestSelecter
- 存放可選擇不同測試分支路徑的function
- function最後需要回傳要被選擇執行的method name字串

預設: 選擇Http狀態的Selecter函式
1.  先設定變數expectedCode表明此次測試預期回傳的response狀態。
2.	參數傳入環境物件，物件應包含選擇邏輯所需資訊。
3.	Selecter function將會跟據實際回傳的status text + 預期設定的expected code 組成之後呼叫的function name回傳
4.  實作的function名稱要對應預期Selecter function回傳的字串一樣，故要以字串”expect” + expected status + expected code定名，同樣下底線隔開各單     字，統一小寫，ex: expect_ok_200(預期發生狀態200), expect_bad_request_400(預期發生狀態400)
    


使用方式 : js檔案內容複製貼上Postman變數欄位
```javascript
const Utils = eval( "(" + pm.variables.get( "Utils" ) + ")" );
const RequestDispatcher = eval( "(" + Utils.getVariable( "RequestDispatcher" ) + ")" );
const TestSelector = eval( "(" + Utils.getVariable( "TestSelector" ) + ")" );
const Tests = new ( eval( "(" + Utils.getVariable( "Tests" ) + ")" ) )();
const TestContext = eval( "(" + Utils.getVariable( "WebApiTestContext" ) + ")" );
const TestTemplate = eval( "(" + Utils.getVariable( "WebApiTestTemplate" ) + ")" );
```

or

```javascript
eval( pm.variables.get( "pm_common" ) );


pm_common =
var Utils = eval( "(" + pm.variables.get( "Utils" ) + ")" )
var RequestDispatcher = eval( "(" + Utils.getVariable( "RequestDispatcher" ) + ")" );
var TestSelector = eval( "(" + Utils.getVariable( "TestSelector" ) + ")" );
var Tests = new ( eval( "(" + Utils.getVariable( "Tests" ) + ")" ) )();
var TestContext = eval( "(" + Utils.getVariable( "WebApiTestContext" ) + ")" );
var TestTemplate = eval( "(" + Utils.getVariable( "WebApiTestTemplate" ) + ")" );
```
