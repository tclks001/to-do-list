# API路由接口
from flask import Blueprint, request, jsonify
from api.models import (
    task_create,
    task_delete,
    task_update,
    taskType_create,
    taskType_delete,
)


task_routes = Blueprint("task", __name__)


@task_routes.route("/create", methods=["POST"])
def create():
    try:
        data = request.get_json()
        task_create(data)
        return jsonify({"message": "创建成功", "username": data["username"]})
    except Exception as e:
        return jsonify({"message": "创建失败", "error": str(e)}), 500


@task_routes.route("/delete", methods=["POST"])
def delete():
    try:
        data = request.get_json()
        task_delete(data)
        return jsonify({"message": "删除成功"})
    except Exception as e:
        return jsonify({"message": "删除失败", "error": str(e)}), 500


@task_routes.route("/update", methods=["POST"])
def update():
    try:
        data = request.get_json()
        task_update(data)
        return jsonify({"message": "更新成功"})
    except Exception as e:
        return jsonify({"message": "更新失败", "error": str(e)}), 500


@task_routes.route("/type/create", methods=["POST"])
def type_create():
    try:
        data = request.get_json()
        taskType_create(data)
        return jsonify({"message": "类型创建成功"})
    except Exception as e:
        return jsonify({"message": "类型创建失败", "error": str(e)}), 500


@task_routes.route("/type/delete", methods=["POST"])
def type_delete():
    try:
        data = request.get_json()
        taskType_delete(data)
        return jsonify({"message": "类型删除成功"})
    except Exception as e:
        return jsonify({"message": "类型删除失败", "error": str(e)}), 500
