package com.teamProject.syusyu.service.order;

import com.teamProject.syusyu.domain.order.CartProdDTO;

import java.util.List;

public interface CartService {
    int add(CartProdDTO cartProductDTO) throws Exception;
    List<CartProdDTO> getCartInfo(int mbrCd) throws Exception;
    int modify(CartProdDTO cartProductDTO) throws Exception;
    int remove(int[] cartProdNo, int delrId) throws Exception;

}
