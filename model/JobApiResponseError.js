JobApiResponseError =
{

    
            
            
   
};


// 欄位檢核錯誤時, response 新增 details 欄位, 用來描述詳細檢核錯誤
// details 欄位裡包含一個或多個錯誤, 每個錯誤為一個 object, 錯誤裡包含 code 和 message
// code 為錯誤的欄位規則
// message 為該欄位規則的錯誤訊息
// 欄位檢核錯誤時, 錯誤訊息改為中文 