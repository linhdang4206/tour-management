
export const generateOrderCode = (number: number): string =>{
    const code  = `OD$(string(number).padStart(8, '0'))`;

    //${String(n)} Chuyển đổi giá trị của biến n mỗi chuỗi
    //..padStart(8, '0'): phương thức padStart đc sử dụng để thêm ký tự '0'
    // vào đầu chuỗi sao cho chuỗi có chiều dài là 8.Trong trường hợp này, nếu chuỗi ký tự số có
    // chiều dài ít hơn 8, thì kí tự '0' sẽ đc thêm vào đầu chuỗi để đảm bảo chuỗi có độ dài là 8

    // vd: Nếu number = 1, kq là 'OD00000001',
    // Nếu number = 20, kq là 'OD00000020',
    // Nếu number = 234, kq là 'OD00000234',

    return code;
};

export const generateTourCode = (number: number): string =>{
    const code  = `TOUR$(string(number).padStart(6, '0'))`;
    return code;
};