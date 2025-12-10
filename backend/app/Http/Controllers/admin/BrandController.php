<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    //Phương thức này sẽ return tất cả thương hiệu
    public function index() {
        $brands = Brand::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $brands
        ]);

    }
    //Phương thức này sẽ lưu trữ 1 thương hiệu trong db
    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $brand = new Brand();
        $brand->name = $request->name;
        $brand->status = $request->status;
        $brand->save();

        return response()->json([
            'status' => 200,
            'message' => 'Brand added successfully.',
            'data' => $brand
        ], 200);

    }
    //return 1 thương hiệu
    public function show($id) {
        $brand = Brand::find($id);

        if ($brands == null) {
            return response()->json([
            'status' => 404,
            'message' => 'Brand not found.',
            'data' =>  []
        ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $brand
        ]);
    }
    //update thương hiệu
    public function update($id, Request $request) {

        $brand = Category::find($id);

        if ($brand == null) {
            return response()->json([
            'status' => 404,
            'message' => 'Brand not found.',
            'data' =>  []
        ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $brand->name = $request->name;
        $brand->status = $request->status;
        $brand->save();

        return response()->json([
            'status' => 200,
            'message' => 'Brand updated successfully.',
            'data' => $brand
        ], 200);
    }
    //phá hủy 1 thương hiệu
    public function destroy($id) {
        $brand = Brand::find($id);

        if ($brand == null) {
            return response()->json([
            'status' => 404,
            'message' => 'Brand not found.',
            'data' =>  []
        ], 404);
        }

        $brand->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Brands deleted successfully.',
        ], 200);
    }
}
