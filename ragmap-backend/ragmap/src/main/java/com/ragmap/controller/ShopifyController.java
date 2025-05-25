package com.ragmap.controller;

import com.ragmap.service.ShopifyService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST})
public class ShopifyController {

    private final ShopifyService shopifyService;

    public ShopifyController(ShopifyService shopifyService) {
        this.shopifyService = shopifyService;
    }

    @GetMapping("/products")
    public String getProducts() {
        System.out.println("Fetching products from Shopify");
        String products = shopifyService.getProducts();
        System.out.println("Products fetched: " + products);

        return products;
    }
}
