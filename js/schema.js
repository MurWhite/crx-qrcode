export const sampleSchema = [{
    "name": "示例",
    "opts": [
        "notitlebar", "wkwebview"
    ],
    "pattern": "sample://web?notitlebar=${notitlebar}&wkwebview=${wkwebview}&url=${encodedUrl}"
}, {
    name: '点评',
    opts: [],
    pattern: 'dianping://web?url=${encodedUrl}'
}]