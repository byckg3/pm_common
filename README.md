# pm_common
可參考 demo、example.js

## TestManager
- 負責 test script 相關物件的建立、組裝和管理
- test script 裡各測試相關物件為 Singleton

## TestContext 
- 存放 Api 測試共同的常用資料
- ex. responseText 取得回應的 body 字串
- setAttribute( key, value ) 可設定跨 test script 的變數
- setEnvironmentAttribute( key, value ) 同為 setAttribute 功能外，額外再設定至 Postman 環境變數區
- setGlobalAttribute( key, value ) 同為 setAttribute 功能外，額外再設定至 Postman 全域變數區
- removeAttribute( key )、clearAttribute() 為對應刪除指定和全部的 attribute

## TestTemplate
- 提供 Web Api 測試共通常用的內容
- 使用者可繼承此 TestTemplate 後覆寫所需的內容

## Utils
- 工具函式庫，包含 Postman的功能 Api
- 持續擴充共用 utility function
- ex. Utils.getValueObjectFromJsonString( jsonString, key1, key2 )

## TestAsserter
- 為方便使用，建立後 assign 給 Tests 變數成為 global object
- 提供測試用 assert 方法並提交測試結果
- assertion method 提供 throw error 中斷流程的功能
- ex. Tests[ "Test name" ] = ( boolean expression ); // 若 fail 還是繼續執行
- ex. Tests.assertEquals( 1 + 1, 2, "1 + 1 === 2");  // 若 pass 繼續執行後續流程，若 fail 則 throw error

## TestLauncher
- TestManager 將待執行的測試物件交由 Launcher 執行
- discover() : "test"、"check"等單字開頭 method 視為可執行的測試，轉交給 Selector 做分類
- execute() : 定義 template 的流程步驟 : setUp => beforeEachTest => before_test => test => after_test => afterEachTest => teardown

## TestSelecter
- 負責對 method name 進行語意分析來進行分類
- 包含 "if" 的 method 被視為有條件的測試
- nextTest() : 回傳選擇執行的 method name 字串
- nextCondition() : 回傳選擇執行的 Condition name 字串

使用方式 : js 檔案內容複製貼上 Postman 變數欄位並引用下列宣告在 test script 開頭

```javascript
eval( pm.variables.get( "pm_common" ) );


pm_common =
var TestManager = eval( "(" + pm.variables.get( "TestManager" ) + ")" );
var Utils = TestManager.import( "Utils" );
var RequestDispatcher = TestManager.import( "RequestDispatcher" );
var TestTemplate = TestManager.import( "TestTemplate" );
var Tests = TestManager.getTestAsserter();
```
