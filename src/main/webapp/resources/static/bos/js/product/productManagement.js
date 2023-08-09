$(document).ready(function() {

    flatpickr(".datepicker", {
        dateFormat: "Y-m-d"
    });
    let today = new Date();

    // 페이지 로드 시 시작/종료 날짜를 오늘 날짜로 설정
    setCalendarRangeByDays('start_date','end_date',180)

    // 날짜버튼 클릭 이벤트 설정
    const container = document.querySelector('.date_range_container');
    container.addEventListener('click', (e) => {
        const clickedButton = e.target;

        // 클릭된 요소가 버튼이 아니라면 함수를 종료한다.
        if (!clickedButton.classList.contains('date_range')) {
            return;
        }

        // 모든 버튼의 활성화 상태를 제거
        const allButtons = container.querySelectorAll('.date_range');
        allButtons.forEach(btn => btn.classList.remove('active'));

        // 클릭된 버튼 활성화
        clickedButton.classList.add('active');

        const interval = clickedButton.getAttribute('data-interval');
        setCalendarRangeByDays('start_date', 'end_date', parseInt(interval));
    });

    //영어면 branNM으로 보낼지  한글이면 brandkoNm으로 보낼지
    document.getElementById('search_keyword').addEventListener('input', function() {
        const keyword = this.value;
        const searchTypeSelect = document.getElementById('search_type');
        const selectedOption = searchTypeSelect.options[searchTypeSelect.selectedIndex];

        if (selectedOption.value === 'brndNm') {
            if (containsKorean(keyword)) {
                selectedOption.value = 'brandKoNm';
            } else {
                selectedOption.value = 'brndNm';
            }
        }
    });


    // 대분류가 선택될 때의 이벤트
    $("#largeNo").on('change', function() {
        // 대분류가 선택되면 중분류 활성화
        if ($(this).val()) { // 값이 선택되었을 경우
            $("#middleNo").prop('disabled', false);
        } else {
            // 대분류가 선택 해제되면 중분류와 소분류 모두 비활성화
            $("#middleNo").prop('disabled', true).val('-중분류-');
            $("#smallNo").prop('disabled', true).val('-소분류-');
        }
    });

    // 중분류가 선택될 때의 이벤트
    $("#middleNo").on('change', function() {
        const selectedMiddleKey = $(this).val(); // 선택된 중분류 키

        if (selectedMiddleKey) { // 중분류가 선택되었을 때
            $("#smallNo").find('option').hide(); // 모든 소분류 항목 숨기기
            $(`#smallNo option[data-small-key="${selectedMiddleKey}"]`).show(); // 선택된 중분류에 맞는 소분류 항목만 보이게
            $("#smallNo").prop('disabled', false); // 소분류 활성화
        } else { // 아무것도 선택되지 않았을 때
            $("#smallNo").prop('disabled', true).val('-소분류-'); // 소분류 비활성화 및 초기화
        }
    });



    $('#productTable').DataTable({
        paging: true,   // 페이징 활성화
        searching: true, // 검색 활성화
        ordering: true, // 컬럼별 정렬 활성화
        scrollX: true,  // 가로 스크롤 활성화
        drawCallback: function() {
            const infoString = $('.dataTables_info').text();
            const matches = /\d+ to \d+ of (\d+) entries/.exec(infoString);

            if (matches && matches.length > 1) {
                const totalEntries = matches[1];
                $('#resultCnt').text(totalEntries);  // <span> 태그에 총 건수를 설정합니다.
            }
        }
    });




    $("#btn_search").click(function() {
        const dataType = $("#date_type").val();
        const startDate = $("#start_date").val();
        const endDate = $("#end_date").val();
        const searchType = $("#search_type").val();
        const searchKeyword = $("#search_keyword").val();


        const checkboxes = document.querySelectorAll('#productStatusCheckbox .chk-point');
        const checkedValues = Array.from(checkboxes).filter(box => box.checked).map(box => parseInt(box.value));
        console.log("Selected Status Values:", checkedValues);

        const largeNm = $("#largeNo").val();
        const middleNm = $("#middleNo").val();
        const smallNm = $("#smallNo").val();

        const searchData = {
            dateType: dataType,
            startDate: startDate,
            endDate: endDate,
            searchType: searchType,
            searchKeyword: searchKeyword,
            statusList: checkedValues,
            largeNm: largeNm,
            middleNm: middleNm,
            smallNm: smallNm
        };

        console.log(searchData);

        $.ajax({
            url: '/bos/product/productList',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(searchData),
            success: function (data) {
                // 서버로부터 받은 상품 리스트를 사용하여 테이블 업데이트
                updateTable(data);
            },
            error: function (xhr, status, error) {
                console.error(error);
            }
        });
    });




});

// 테이블 업데이트 함수
function updateTable(data) {
    // DataTables 플러그인을 사용하여 테이블 초기화 및 업데이트
    $('#productTable').DataTable({
        data:data,
        destroy:true,  // 기존의 DataTables 인스턴스가 있다면 제거
        scrollX: true,  // 가로 스크롤 활성화
        columns:[
            {//체크박스
                "title": "<input type='checkbox' id='select-all' />",
                "render": function(data, type, row) {
                    return "<input type='checkbox' class='row-checkbox' value='" + row.prodId + "'>";
                },
                "orderable": false // 체크박스 컬럼에서 정렬 기능을 비활성화합니다.
            },
            {//수정버튼
                "title": "수정",
                "render": function(data, type, row) {
                    return "<button class='edit-button'>수정</button>";
                },
                "orderable": false
            },
            {//삭제버튼
                "title": "삭제",
                "render": function(data, type, row) {
                    return "<button class='delete-button'>삭제</button>";
                },
                "orderable": false
            },
            {"title": "상품번호", "data": "prodId"},
            {"title": "상품명", "data": "prodNm"},
            {//상세설명 에디터모달창
                "title": "상세설명",
                "render": function(data, type, row) {
                    return "<button class='detail-button'>상세보기</button>";
                },
                "orderable": false // 버튼 컬럼에서 정렬 기능을 비활성화합니다.
            },
            {"title": "판매상태", "data": "status"},
            {"title": "판매상태명", "data": "statusNm"}, // GET_CD_NM('P0002', P.STATUS) 결과에 해당
            {"title": "전시상태", "data": "dspyYn"},
            {"title": "재고수량", "data": "totQty", render: numberWithCommas },
            {"title": "매입가", "data": "buyPrc", render: numberWithCommas },
            {"title": "판매가", "data": "salePrc", render: numberWithCommas },
            {"title": "한인율", "data": "dcPer"},
            {"title": "할인가", "data": "dcPrc", render: numberWithCommas },
            {"title": "최대구매수량", "data": "dlvChgDtl", render: numberWithCommas },
            {"title": "판매수량", "data": "buyCnt", render: numberWithCommas },
            {"title": "포인트", "data": "point", render: numberWithCommas },
            {"title": "총판매금액", "data": "totPrc", render: numberWithCommas },
            {"title": "대분류번호", "data": "largeNo"},
            {"title": "대분류", "data": "largeNm"},
            {"title": "중분류번호", "data": "middleNo"},
            {"title": "중분류", "data": "middleNm"},
            {"title": "소분류번호", "data": "smallNo"},
            {"title": "소분류", "data": "smallNm"},
            {"title": "모델명", "data": "modelNm"},
            {"title": "브랜드아이디", "data": "brndId"},
            {"title": "브랜드명", "data": "brndNm"},
            {"title": "제품소재", "data": "mfgdMatr"},
            {"title": "제조사번호", "data": "mftco"},
            {"title": "제조사", "data": "mftcoName"},
            {"title": "제조국번호", "data": "mftNatn"},
            {"title": "제조국", "data": "mftNatnName"},
            {"title": "좋아요", "data": "vwCnt", render: numberWithCommas },
            {"title": "상품등록일", "data": "regDttm"},
            {"title": "최종수정일", "data": "updDttm"},
            {"title": "상품판매시작일","data": "saleStDttm"},
            {"title": "상품판매종료일","data": "saleEdDttm"},
            {"title": "상품할인시작일","data": "dcStDttm"},
            {"title": "상품판매종료일","data": "dcEdDttm"}

        ]
    });

}

// 한글 여부를 확인하는 함수
function containsKorean(text) {
    return /[\u3131-\u314E\u314F-\u3163\uAC00-\uD7A3]/.test(text);
}

//천단위 콤마
function numberWithCommas(data, type, row) {
    if (type === 'display') {
        return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    return data; // type이 'sort' 또는 'filter'인 경우 원래의 데이터를 반환합니다.
}