<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $products
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'price' => 'required|numeric',
            'category' => 'required|integer',
            'sku' => 'required|unique:products,sku',
            'is_featured' => 'required',
            'status' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }
        $product = new Product();
        $product->title = $request->title;
        $product->price = $request->price;
        $product->compare_price = $request->compare_price;
        $product->category_id = $request->category;
        $product->brand_id = $request->brand;
        $product->is_featured = $request->brand;
        $product->sku = $request->sku;
        $product->qty = $request->qty;
        $product->description = $request->description;
        $product->short_description = $request->short_description;
        $product->status = $request->status;
        $product->is_featured = $request->is_featured;
        $product->barcode = $request->barcode;
        $product->save();
        return response()->json([
            'status' => 200,
            'message' => 'Product added successfully.',
        ], 200);
    }

    // public function show($id)
    // {
    //     $category = Category::find($id);
    //     if ($category == null) {
    //         return response()->json([
    //             'status' => 404,
    //             'message' => 'Category not found.',
    //             'data' => []
    //         ], 404);
    //     }
    //     return response()->json([
    //         'status' => 200,
    //         'data' => $category
    //     ], 200);
    // }

    // public function update($id, Request $request)
    // {
    //     $category = Category::find($id);
    //     if ($category == null) {
    //         return response()->json([
    //             'status' => 404,
    //             'message' => 'Category not found.',
    //             'data' => []
    //         ], 404);
    //     }
    //     $validator = Validator::make($request->all(), [
    //         'name' => 'required'
    //     ]);
    //     if ($validator->fails()) {
    //         return response()->json([
    //             'status' => 400,
    //             'errors' => $validator->errors()
    //         ], 400);
    //     }
    //     $category->name = $request->name;
    //     $category->status = $request->status;
    //     $category->save();
    //     return response()->json([
    //         'status' => 200,
    //         'message' => 'Category updated successfully.',
    //         'data' => $category
    //     ], 200);
    // }

    // public function destroy($id)
    // {
    //     $category = Category::find($id);
    //     if ($category == null) {
    //         return response()->json([
    //             'status' => 404,
    //             'message' => 'Category not found.',
    //             'data' => []
    //         ], 404);
    //     }
    //     $category->delete();
    //     return response()->json([
    //         'status' => 200,
    //         'message' => 'Category deleted successfully.',
    //     ], 200);
    // }
}
