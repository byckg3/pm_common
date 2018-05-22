# pm_common
測試函式實作要點(參考example.js)
1.  先設定變數expectedCode表明此次測試預期回傳的response狀態。
2.	實作的function name定為字串”expect” + expected status + expected code，並以下底線隔開各單字，統一小寫(討論)
    ex: expect _ok_200, expect _bad_request_400。
3.	function至少要有一個傳入參數做為此測試script的環境物件，物件應包含測試所需要的全部資料，也可視需求對環境物件做新增刪除屬性等操作。
4.	將實作的function註冊到TestRunner。
5.	runner將會依據實際回傳的status text + 預期設定的expected code 組成欲呼叫的function name(同樣下底線隔開各單字，統一小寫)

保留變數
1. Context
2. TestRunner

使用方式 : 複製貼上Postman變數欄位XD
