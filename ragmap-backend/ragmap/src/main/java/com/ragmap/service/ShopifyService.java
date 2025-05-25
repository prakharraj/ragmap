package com.ragmap.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ShopifyService {

    @Value("${shopify.store}")
    private String shopifyStore;

   /* @Value("${shopify.tkn}")
    private String tkn;*/

    private final WebClient webClient;

    public ShopifyService(WebClient.Builder builder) {
        this.webClient = builder.build();
    }

    public String getProducts() {
        return webClient.get()
                .uri("https://" + shopifyStore+"/admin/api/2023-04/products.json")
               // .header("X-Shopify-Access-Token", tkn)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
