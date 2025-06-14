package com.ragmap.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class ShopifyService {

    @Value("${shopify.api.base-url}")
    private String baseUri;

//    @Value("${shopify.tkn}")
//    private String tkn;

    private final WebClient webClient;

    public ShopifyService(WebClient.Builder builder) {
        this.webClient = builder.build();
    }

    public String getProducts() {
        return webClient.get()
                .uri(baseUri + "/products.json")
                //.header("X-Shopify-Access-Token", tkn)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public String getCustomer(String email) {
        String customerEndPoint = baseUri + "/customers/search.json?query=email:";
        if (email != null && !email.isEmpty()) {
            customerEndPoint += email;
        } else {
            customerEndPoint += "";
        }
        return webClient.get()
                .uri(customerEndPoint)
                //.header("X-Shopify-Access-Token", tkn)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
