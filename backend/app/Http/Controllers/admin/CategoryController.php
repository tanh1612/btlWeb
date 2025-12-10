<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    //Phương thức này sẽ return tất cả danh mục
    public function index() {
        $categories = Category::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $categories
        ]);
        
    }
    //Phương thức này sẽ lưu trữ 1 danh mục trong db
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

        $category = new Category();
        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            'status' => 200,
            'message' => 'Category added successfully.',
            'data' => $category
        ], 200);

    }
    //return 1 danh mục
    public function show($id) {
        $category = Category::find($id);

        if ($category == null) {
            return response()->json([
            'status' => 404,
            'message' => 'Category not found.',
            'data' =>  []
        ], 404);
        }

        return response()->json([
            'status' => 200,
            'data' => $category
        ]);
    }
    //update danh mục
    public function update($id, Request $request) {

        $category = Category::find($id);

        if ($category == null) {
            return response()->json([
            'status' => 404,
            'message' => 'Category not found.',
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

        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            'status' => 200,
            'message' => 'Category updated successfully.',
            'data' => $category
        ], 200);
    }
    //phá hủy 1 danh mục
    public function destroy($id) {
        $category = Category::find($id);

        if ($category == null) {
            return response()->json([
            'status' => 404,
            'message' => 'Category not found.',
            'data' =>  []
        ], 404);
        }

        $categories->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Category deleted successfully.',
        ], 200);
    }
}
