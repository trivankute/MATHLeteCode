var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var operators = ['+', '-', '*'];
var rowOperators;
var colOperators;
var targetRow1, targetRow3, targetRow5;
var targetCol1, targetCol3, targetCol5;

function validatePuzzle() {
    // 1. Lấy toàn bộ giá trị từ các ô nhập dữ liệu
    const c11 = parseInt(document.getElementById('cell-1-1').value) || 0;
    const c13 = parseInt(document.getElementById('cell-1-3').value) || 0;
    const c15 = parseInt(document.getElementById('cell-1-5').value) || 0;

    const c31 = parseInt(document.getElementById('cell-3-1').value) || 0;
    const c33 = parseInt(document.getElementById('cell-3-3').value) || 0;
    const c35 = parseInt(document.getElementById('cell-3-5').value) || 0;

    const c51 = parseInt(document.getElementById('cell-5-1').value) || 0;
    const c53 = parseInt(document.getElementById('cell-5-3').value) || 0;
    const c55 = parseInt(document.getElementById('cell-5-5').value) || 0;

    const feedback = document.getElementById('feedback');

    // ==========================================
    // RÀNG BUỘC 1: KIỂM TRA CHỮ SỐ DUY NHẤT (1-9)
    // ==========================================
    const allDigits = [c11, c13, c15, c31, c33, c35, c51, c53, c55];
    
    // Dùng Set để lọc các phần tử trùng lặp
    const uniqueDigits = new Set(allDigits);

    // Kiểm tra xem có ô nào nằm ngoài khoảng 1-9 không
    const hasInvalidDigit = allDigits.some(num => num < 1 || num > 9);

    if (uniqueDigits.size !== 9 || hasInvalidDigit) {
        feedback.textContent = "❌ Invalid numbers! You must use each digit from 1 to 9 exactly once.";
        feedback.className = "feedback-message status--error";
        return; // Dừng hàm tại đây luôn, không thèm tính toán toán học tiếp nữa
    }

    // ==========================================
    // RÀNG BUỘC 2: TÍNH TOÁN TOÁN HỌC (SELECTION)
    // ==========================================
    // Tính toán các phương trình HÀNG NGANG (Left-to-Right)
    var row1_calc = c11
    if(rowOperators[0][0] === '+') row1_calc += c13;
    else if(rowOperators[0][0] === '-') row1_calc -= c13;
    else if(rowOperators[0][0] === '*') row1_calc *= c13;
    if(rowOperators[0][1] === '+') row1_calc += c15;
    else if(rowOperators[0][1] === '-') row1_calc -= c15;
    else if(rowOperators[0][1] === '*') row1_calc *= c15;

    var row3_calc = c31;
    if(rowOperators[1][0] === '+') row3_calc += c33;
    else if(rowOperators[1][0] === '-') row3_calc -= c33;
    else if(rowOperators[1][0] === '*') row3_calc *= c33;
    if(rowOperators[1][1] === '+') row3_calc += c35;
    else if(rowOperators[1][1] === '-') row3_calc -= c35;
    else if(rowOperators[1][1] === '*') row3_calc *= c35;

    var row5_calc = c51;
    if(rowOperators[2][0] === '+') row5_calc += c53;
    else if(rowOperators[2][0] === '-') row5_calc -= c53;
    else if(rowOperators[2][0] === '*') row5_calc *= c53;
    if(rowOperators[2][1] === '+') row5_calc += c55;
    else if(rowOperators[2][1] === '-') row5_calc -= c55;
    else if(rowOperators[2][1] === '*') row5_calc *= c55;

    // Tính toán các phương trình HÀNG DỌC (Top-to-Bottom)
    var col1_calc = c11;
    if(colOperators[0][0] === '+') col1_calc += c31;
    else if(colOperators[0][0] === '-') col1_calc -= c31;
    else if(colOperators[0][0] === '*') col1_calc *= c31;
    if(colOperators[0][1] === '+') col1_calc += c51;
    else if(colOperators[0][1] === '-') col1_calc -= c51;
    else if(colOperators[0][1] === '*') col1_calc *= c51;

    var col3_calc = c13;
    if(colOperators[1][0] === '+') col3_calc += c33;
    else if(colOperators[1][0] === '-') col3_calc -= c33;
    else if(colOperators[1][0] === '*') col3_calc *= c33;
    if(colOperators[1][1] === '+') col3_calc += c53;
    else if(colOperators[1][1] === '-') col3_calc -= c53;
    else if(colOperators[1][1] === '*') col3_calc *= c53;

    var col5_calc = c15;
    if(colOperators[2][0] === '+') col5_calc += c35;
    else if(colOperators[2][0] === '-') col5_calc -= c35;
    else if(colOperators[2][0] === '*') col5_calc *= c35;
    if(colOperators[2][1] === '+') col5_calc += c55;
    else if(colOperators[2][1] === '-') col5_calc -= c55;
    else if(colOperators[2][1] === '*') col5_calc *= c55;

    // Kiểm tra kết quả đích
    const row1_correct = (row1_calc === targetRow1);
    const row3_correct = (row3_calc === targetRow3);
    const row5_correct = (row5_calc === targetRow5);

    const col1_correct = (col1_calc === targetCol1);
    const col3_correct = (col3_calc === targetCol3);
    const col5_correct = (col5_calc === targetCol5);

    // ==========================================
    // 3. ĐƯA RA KẾT LUẬN CUỐI CÙNG
    // ==========================================
    if (row1_correct && row3_correct && row5_correct && col1_correct && col3_correct && col5_correct) {
        feedback.textContent = "🎉 Brilliant! All unique digits and math constraints are perfectly satisfied.";
        feedback.className = "feedback-message status--success";
    } else {
        feedback.textContent = "❌ Math constraints failed. The digits are unique, but the equations don't match!";
        feedback.className = "feedback-message status--error";
    }
}

// show solutions
function showSolutions() {
    const solutions = [
        { cell: 'cell-1-1', value: numbers[0] },
        { cell: 'cell-1-3', value: numbers[1] },
        { cell: 'cell-1-5', value: numbers[2] },
        { cell: 'cell-3-1', value: numbers[3] },
        { cell: 'cell-3-3', value: numbers[4] },
        { cell: 'cell-3-5', value: numbers[5] },
        { cell: 'cell-5-1', value: numbers[6] },
        { cell: 'cell-5-3', value: numbers[7] },
        { cell: 'cell-5-5', value: numbers[8] }
    ];
    solutions.forEach(solution => {
        document.getElementById(solution.cell).value = solution.value;
    });
    validatePuzzle(); // Validate after showing solutions
}

// Hàm sinh đề bài ngẫu nhiên và tự động tính toán kết quả đích
function generateRandomPuzzle() {
    // 1. Sinh mảng ngẫu nhiên từ 1 đến 9 không lặp lại (Fisher-Yates Shuffle hoặc Sort ngẫu nhiên)
    numbers.sort(() => Math.random() - 0.5);

    // random operators for rows and columns
    rowOperators = [
        [operators[Math.floor(Math.random() * operators.length)], operators[Math.floor(Math.random() * operators.length)]],
        [operators[Math.floor(Math.random() * operators.length)], operators[Math.floor(Math.random() * operators.length)]],
        [operators[Math.floor(Math.random() * operators.length)], operators[Math.floor(Math.random() * operators.length)]]
    ];
    colOperators = [[operators[Math.floor(Math.random() * operators.length)], operators[Math.floor(Math.random() * operators.length)]],
        [operators[Math.floor(Math.random() * operators.length)], operators[Math.floor(Math.random() * operators.length)]],
        [operators[Math.floor(Math.random() * operators.length)], operators[Math.floor(Math.random() * operators.length)]]];

    // 2. Định nghĩa vị trí các số trong ma trận 3x3 giả định
    const c11 = numbers[0]; const c13 = numbers[1]; const c15 = numbers[2];
    const c31 = numbers[3]; const c33 = numbers[4]; const c35 = numbers[5];
    const c51 = numbers[6]; const c53 = numbers[7]; const c55 = numbers[8];

    // Phép tính hàng ngang (Trực tiếp từ trái sang phải)
    targetRow1 = c11; 
    if(rowOperators[0][0] === '+') targetRow1 += c13;
    else if(rowOperators[0][0] === '-') targetRow1 -= c13;
    else if(rowOperators[0][0] === '*') targetRow1 *= c13;
    if(rowOperators[0][1] === '+') targetRow1 += c15;
    else if(rowOperators[0][1] === '-') targetRow1 -= c15;
    else if(rowOperators[0][1] === '*') targetRow1 *= c15;

    targetRow3 = c31;
    if(rowOperators[1][0] === '+') targetRow3 += c33;
    else if(rowOperators[1][0] === '-') targetRow3 -= c33;
    else if(rowOperators[1][0] === '*') targetRow3 *= c33;
    if(rowOperators[1][1] === '+') targetRow3 += c35;
    else if(rowOperators[1][1] === '-') targetRow3 -= c35;
    else if(rowOperators[1][1] === '*') targetRow3 *= c35;

    targetRow5 = c51;
    if(rowOperators[2][0] === '+') targetRow5 += c53;
    else if(rowOperators[2][0] === '-') targetRow5 -= c53;
    else if(rowOperators[2][0] === '*') targetRow5 *= c53;
    if(rowOperators[2][1] === '+') targetRow5 += c55;
    else if(rowOperators[2][1] === '-') targetRow5 -= c55;
    else if(rowOperators[2][1] === '*') targetRow5 *= c55;

    // Phép tính hàng dọc (Trực tiếp từ trên xuống dưới)
    targetCol1 = c11;
    if(colOperators[0][0] === '+') targetCol1 += c31;
    else if(colOperators[0][0] === '-') targetCol1 -= c31;
    else if(colOperators[0][0] === '*') targetCol1 *= c31;
    if(colOperators[0][1] === '+') targetCol1 += c51;
    else if(colOperators[0][1] === '-') targetCol1 -= c51;
    else if(colOperators[0][1] === '*') targetCol1 *= c51;
    
    targetCol3 = c13;
    if(colOperators[1][0] === '+') targetCol3 += c33;
    else if(colOperators[1][0] === '-') targetCol3 -= c33;
    else if(colOperators[1][0] === '*') targetCol3 *= c33;
    if(colOperators[1][1] === '+') targetCol3 += c53;
    else if(colOperators[1][1] === '-') targetCol3 -= c53;
    else if(colOperators[1][1] === '*') targetCol3 *= c53;

    targetCol5 = c15;
    if(colOperators[2][0] === '+') targetCol5 += c35;
    else if(colOperators[2][0] === '-') targetCol5 -= c35;
    else if(colOperators[2][0] === '*') targetCol5 *= c35;
    if(colOperators[2][1] === '+') targetCol5 += c55;
    else if(colOperators[2][1] === '-') targetCol5 -= c55;
    else if(colOperators[2][1] === '*') targetCol5 *= c55;

    if(targetRow1 < 0 || targetRow3 < 0 || targetRow5 < 0 || targetCol1 < 0 || targetCol3 < 0 || targetCol5 < 0) {
        // Nếu bất kỳ kết quả nào là âm, gọi lại hàm để tạo một đề bài mới
        generateRandomPuzzle();
        return; // Dừng hàm hiện tại
    }

    // print all
    // console.log("Row Operators: ", rowOperators);
    // console.log("Col Operators: ", colOperators);
    // console.log("Numbers: ", numbers);
    // console.log("Target Row 1: ", targetRow1);
    // console.log("Target Row 3: ", targetRow3);
    // console.log("Target Row 5: ", targetRow5);
    // console.log("Target Col 1: ", targetCol1);
    // console.log("Target Col 3: ", targetCol3);
    // console.log("Target Col 5: ", targetCol5);

    
    // Update operators in the HTML
    document.querySelectorAll('.grid-container .operator').forEach((op, index) => {
        if(index < 2) {
            op.textContent = rowOperators[0][index];
        } else if(index >= 2 && index <= 4) {
            op.textContent = colOperators[index - 2][0];
        } else if(index > 4 && index <= 6) {
            op.textContent = rowOperators[1][index - 5];
        } else if(index > 6 && index <= 9) {
            op.textContent = colOperators[index - 7][1];
        } else if(index > 9 && index <= 11) {
            op.textContent = rowOperators[2][index - 10];
        }
    });

    // 3. Tính toán các kết quả đích mới dựa trên hệ thống toán tử cố định của bảng

    // 4. Cập nhật các kết quả đích mới này lên giao diện HTML
    // Chúng ta cần thêm các ID hoặc class tương ứng ở HTML để JS tìm được chỗ ghi điểm.
    // Ở đây tôi giả định ông sẽ thêm ID cho các ô kết quả đích:
    document.querySelectorAll('.target-result').forEach((result, index) => {
        if (index === 0) result.textContent = targetRow1;
        else if (index === 1) result.textContent = targetRow3;
        else if (index === 2) result.textContent = targetRow5;
        else if (index === 3) result.textContent = targetCol1;
        else if (index === 4) result.textContent = targetCol3;
        else if (index === 5) result.textContent = targetCol5;
    });

}

// gọi hàm generateRandomPuzzle() khi trang web được tải xong
document.addEventListener('DOMContentLoaded', () => {
    generateRandomPuzzle();
});