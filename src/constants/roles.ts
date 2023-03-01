const CATALOG_ADMIN_ROLES = {
    CREATE_SKU: 'create-sku',	
    CREATE_BRAND: 'create-brand',	
    CREATE_CATEGORY: 'create-category',
    CREATE_PRODUCT: 'create-product',
    UPDATE_SKU: 'update-sku',
    UPDATE_PRODUCT: 'update-product'
}

const USER_ROLES = {
    ADD_CUSTOMER_FAVORITE_PRODUCT: 'add-customer-favorite-product',
    ADD_PRODUCT_EVALUATION: 'add-product-evaluation',
    CHECKOUT_ORDER: 'checkout-order',
    DELETE_CUSTOMER_FAVORITE_PRODUCT: 'delete-customer-favorite-product',	
    GET_CUSTOMER_FAVORITE_PRODUCTS: 'get-customer-favorite-products',
    GET_CUSTOMER_ORDERS: 'get-customer-orders',
    GET_CUSTOMER_PRODUCTS_EVALUATIONS: 'get-customer-products-evaluations'
}

const STOCK_OPERATOR_ROLES = {
    GET_ORDERS_READY_TO_SHIP: 'get-orders-ready-to-ship',
    UPDATE_ORDER_STATUS: 'update-order-status'
}

const ROLES = { 
    ...CATALOG_ADMIN_ROLES, 
    ...USER_ROLES,
    ...STOCK_OPERATOR_ROLES
}

export default { ROLES, CATALOG_ADMIN_ROLES, USER_ROLES, STOCK_OPERATOR_ROLES };