# pm_common
可參考 demo、example.js
## TestContext 
- 傳入 TestTemplate 建構式
- setup 階段後應該包含所有 test 所需資料，供後續 function 共享使用
- 持續擴充常用資料
- 在 class 裡面使用 this.context 可取得 TestContext 物件的 reference
- ex. this.context.responseText 取得回應的 body 字串

## TestTemplate
- 提供預先定義的 template 方法
- 使用者繼承此 TestTemplate 後覆寫所需的 method
- run() 會依序呼叫 setUp、mainTest (自訂名稱) or unexpected、tearDown
- 可用 super 關鍵字存取父親的已定義的 data 和已實作的 method
- 宣告且實作 mainTest (自訂名稱)

## Utils
- 當作工具函式庫
- 持續擴充共用 function
- ex. Utils.getValueObjectFromJsonString( jsonString, key1, key2 )

## Tests
- global object
- 提供測試方法並存放測試結果
- assert 開頭的 method 提供中斷流程 throw error 的功能
- ex. Tests[ "Test name" ] = ( boolean expression );

## TestSelecter
- 存放可選擇不同測試分支路徑的 function
- function 最後需要回傳要被選擇執行的 method name 字串

預設: 選擇 Http 狀態的 Selecter 函式
1.  先在 context 設定變數 expectedCode 表明此次測試預期回傳的 response 狀態(預設 200 )。
2.	參數傳入環境物件，物件應包含選擇邏輯所需資訊。
3.	Selecter function 將會跟據實際回傳的 status text + 預期設定的 expected code 組成之後呼叫的 function name 回傳
1.  實作的 function 名稱要與對應預期 Selecter function 回傳的字串一樣，故要以字串”expect” + expected status + expected code 定名，同樣下底線隔開各單字，統一小寫，ex: expect_ok_200 (預期發生狀態 200 ), expect_bad_request_400 (預期發生狀態 400 )
    


使用方式 : js 檔案內容複製貼上 Postman 變數欄位並引用下列宣告在 test script 開頭
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
var Utils = eval( "(" + pm.variables.get( "Utils" ) + ")" );
var RequestDispatcher = eval( "(" + Utils.getVariable( "RequestDispatcher" ) + ")" );
var TestSelector = eval( "(" + Utils.getVariable( "TestSelector" ) + ")" );
var Tests = new ( eval( "(" + Utils.getVariable( "Tests" ) + ")" ) )();
var TestContext = eval( "(" + Utils.getVariable( "WebApiTestContext" ) + ")" );
var TestTemplate = eval( "(" + Utils.getVariable( "WebApiTestTemplate" ) + ")" );
```
