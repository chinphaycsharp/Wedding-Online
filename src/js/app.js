$(function () {
	// Get the current URL
	const urlParams = new URLSearchParams(window.location.search);

	// Retrieve the guestname parameter
	const id = urlParams.get('id');

    const API_KEY = 'AIzaSyDnd_ZMdIPFvdlyBKNOptyscoeIpGJx1WA';  // Thay bằng API key của bạn
    const SHEET_ID = '1IbKdRbIIogoc71gCABeCeLpwHhYqhvmoaGGgnSyT_Ew';  // Thay bằng ID của Google Sheets
    const RANGE = 'Generator_Invitation_Card!A2:E999'; // Đọc các dòng từ A2 đến F10 (các cột liên quan)

    const URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        const rows = data.values;
        let result = null;
        
        // Tìm kiếm searchID trong cột A (A2 đến dòng cuối cùng có giá trị)
        for (let i = 0; i < rows.length; i++) {
          if (rows[i][0] === id) {
            result = {
              row: i + 2, // Trả về số dòng tìm thấy (vì bắt đầu từ A2)
              guestName: rows[i][1],
              lunchType: rows[i][2],
              lunchDate: rows[i][3],
              lunchTime: rows[i][4],
            };
            break;
          }
        }

        if (result) {
            console.log('Data found:', result);
          
            // Check if guestname exists
        	if (result.guestName) {
        		$(".guest-name").text(" " + result.guestName + " ");
        	} else {
        		$(".guest-name").text(" ");
        	}
        
        	// Check if lunchType exists
        	if (result.lunchType == "Nhà trai") {
        		$(".lunchType").text("TẠI TƯ GIA NHÀ TRAI");
        		$("#lunchAddress").text("Ngõ 78 - Phố Đông Quang - Phường Hàm Rồng - Thành phố Thanh Hóa");
        		$("#weddingType").text("LỄ THÀNH HÔN");
        		$("#weddingTime").text("11h00");
        	} else if (result.lunchType == "Nhà gái") {
        		$(".lunchType").text("TẠI TƯ GIA NHÀ GÁI");
        		$("#lunchAddress").text("Thôn Lương Ngọc - Xã Tân Tiến - Huyện Hưng Hà - Thái Bình");
        		$("#weddingType").text("LỄ VU QUY");
        		$("#weddingTime").text("06h00");
        	}
        
        	// Check if lunchDate exists
        	if (result.lunchDate == 12) {
        		$("#lunchDate").text(result.lunchDate);
        		$("#DOW").text("THỨ 7");
        		$("#lunchDate1").text("10");
        	} else if (result.lunchDate == 13) {
        		$("#lunchDate").text(result.lunchDate);
        		$("#DOW").text("CHỦ NHẬT");
        		$("#lunchDate1").text("11");
        	}
        
        	// Check if lunchTime exists
        	if (result.lunchTime) {
        		$("#lunchTime").text(result.lunchTime);
        	}
        } else {
          console.log('ID not found');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });


	// Gọi hàm tạo hoa rơi sau mỗi 500ms
	setInterval(createFlower, 500);
});

$(window).on('load', function () {
	// Thêm class 'loaded' vào body để hiển thị nội dung
	$('body').addClass('loaded');

	$('.line').each(function (index) {
		// Dùng setTimeout để tạo độ trễ gối đầu giữa các dòng
		setTimeout(() => {
			$(this).addClass('show'); // Thêm lớp 'show' để hiện dòng chữ
		}, 200 * index); // Gối đầu sau 0.3 giây (300ms) giữa các dòng
	});
});

function createFlower() {
	// Tạo hình ảnh cánh hoa
	const flower = $('<img src="src/img/heart.png" class="flower" />');
	$('body').append(flower);

	// Đặt vị trí ngẫu nhiên cho cánh hoa rơi từ phía trên
	const startLeft = Math.random() * window.innerWidth - 30;
	const fallTime = Math.random() * 4 + 8; // Tốc độ rơi từ 3 đến 6 giây
	const size = Math.random() * 20 + 20; // Kích thước hoa từ 20px đến 40px

	flower.css({
		left: `${startLeft}px`,
		width: `${size}px`,
		height: `${size}px`,
		opacity: 0.6,
		animation: `fall ${fallTime}s linear`,
		top: `-50px`, // Bắt đầu từ phía trên cùng
		position: 'fixed'
	});

	// Sau khi hoa rơi xong, xóa khỏi DOM
	setTimeout(() => {
		flower.remove();
	}, fallTime * 1000);
}
