# API路由接口
from flask import Blueprint, request, jsonify
from api.models import (
    user_register,
    user_login,
    user_logout,
    user_delete,
    user_datafetch,
)


user_routes = Blueprint("user", __name__)


@user_routes.route("/register", methods=["POST"])
def register():
    # 注册接口
    try:
        data = request.get_json()
        user_register(data)
        return jsonify({"message": "注册成功"})
    except Exception as e:
        return jsonify({"message": "注册失败", "error": str(e)}), 500


@user_routes.route("/login", methods=["POST"])
def login():
    # 登录接口
    try:
        data = request.get_json()
        user_datafetch(data)
        return jsonify({"message": "登录成功"})
    except Exception as e:
        return jsonify({"message": "登录失败", "error": str(e)}), 500


@user_routes.route("/logout", methods=["POST"])
def logout():
    # 登出接口
    try:
        data = request.get_json()
        user_logout(data)
        return jsonify({"message": "登出成功"})
    except Exception as e:
        return jsonify({"message": "登出失败", "error": str(e)}), 500


@user_routes.route("/delete", methods=["POST"])
def delete():
    # 删除用户接口
    try:
        data = request.get_json()
        user_delete(data)
        return jsonify({"message": "删除成功"})
    except Exception as e:
        return jsonify({"message": "删除失败", "error": str(e)}), 500


@user_routes.route("/datafetch", methods=["POST"])
def datafetch():
    # 获取用户数据接口
    try:
        data = request.get_json()
        response = user_datafetch(data)
        return jsonify({"message": "获取成功", "data": response})
    except Exception as e:
        return jsonify({"message": "获取失败", "error": str(e)}), 500
