#!/bin/bash

# Array of files that still need Response type updates
files=(
  "src/v1/products/getOne.ts"
  "src/v1/products/create.ts" 
  "src/v1/products/updateOne.ts"
  "src/v1/catalog/listProviders.ts"
  "src/v1/catalog/getBlueprintVariants.ts"
  "src/v1/catalog/getBlueprint.ts"
  "src/v1/catalog/getVariantShipping.ts"
  "src/v1/catalog/getProvider.ts"
  "src/v1/catalog/getBlueprintProviders.ts"
  "src/v1/catalog/listBlueprints.ts"
  "src/v1/uploads/getById.ts"
  "src/v1/uploads/uploadImage.ts"
  "src/v1/orders/cancelUnpaid.ts"
  "src/v1/orders/calculateShipping.ts"
  "src/v1/orders/sendToProduction.ts"
  "src/v1/orders/submitExpress.ts"
  "src/v1/webhooks/updateOne.ts"
  "src/v1/webhooks/list.ts"
  "src/v1/webhooks/deleteOne.ts"
  "src/v2/catalog/getStandardShippingInfo.ts"
  "src/v2/catalog/getShippingListInfo.ts"
  "src/v2/catalog/getPriorityShippingInfo.ts"
  "src/v2/catalog/getExpressShippingInfo.ts"
)

echo "Files to update: ${#files[@]}"
for file in "${files[@]}"; do
  echo "Would update: $file"
done
