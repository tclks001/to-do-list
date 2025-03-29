# 数据库模型和操作
from flask import jsonify
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

default_task_types = {"default": "emoji", "work": "pen", "personal": "book"}


class User(db.Model):
    username = db.Column(db.String(50), unique=True, nullable=False, primary_key=True)
    task_types = db.Column(
        db.json,
        default=default_task_types,
    )


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    username = db.Column(db.String(50), db.ForeignKey("user.username"), nullable=False)
    status = db.Column(db.String(20), default="To Do")
    type_of = db.Column(db.String(50))
    type_icon = db.Column(db.String(50))
    start_date = db.Column(db.DateTime)
    due_date = db.Column(db.DateTime)
    created_at = db.Column(db.DateTime, default=db.func.now())


def init_db():
    db.create_all()


def user_register(data):
    username = data["username"]
    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists"}), 400
    else:
        user = User(username=username)
        db.session.add(user)
        db.session.commit()
        return jsonify({"message": "User created successfully"})


def user_login(data):
    username = data["username"]
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({"message": "Login successful"})
    else:
        return jsonify({"message": "Invalid username"}), 400


def user_logout(data):
    username = data["username"]
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({"message": "Logout successful"})
    else:
        return jsonify({"message": "Invalid username"}), 400


def user_delete(data):
    username = data["username"]
    user = User.query.filter_by(username=username).first()
    if user:
        db.session.delete(user)
        db.session.commit()
        return jsonify({"message": "User deleted successfully"})
    else:
        return jsonify({"message": "Invalid username"}), 400


def user_datafetch(data):
    username = data["username"]
    user = User.query.filter_by(username=username).first()
    if user:
        tasks_of_user = Task.query.filter_by(user_id=user.id).all()
        return jsonify(user, tasks_of_user)
    else:
        return jsonify({"message": "Invalid username"}), 400


def task_create(data):
    username = data["username"]
    user = User.query.filter_by(username=username).first()
    if user:
        task = Task(
            title=data["title"],
            description=data["description"],
            username=data["username"],
            type_of=data["type_of"],
            type_icon=data["type_icon"],
            start_date=data["start_date"],
            due_date=data["due_date"],
        )
        db.session.add(task)
        db.session.commit()
        return jsonify({"message": "Task created successfully"})
    else:
        return jsonify({"message": "Invalid username"}), 400


def task_delete(data):
    username = data["username"]
    user = User.query.filter_by(username=username).first()
    if user:
        task = Task.query.filter_by(id=data["id"]).first()
        if task:
            db.session.delete(task)
            db.session.commit()
            return jsonify({"message": "Task deleted successfully"})
        else:
            return jsonify({"message": "Invalid task id"}), 400
    else:
        return jsonify({"message": "Invalid username"}), 400


def task_update(data):
    username = data["username"]
    user = User.query.filter_by(username=username).first()
    if user:
        task = Task.query.filter_by(id=data["id"]).first()
        if task:
            task.title = data["title"]
            task.description = data["description"]
            task.status = data["status"]
            task.type_of = data["type_of"]
            task.type_icon = data["type_icon"]
            task.start_date = data["start_date"]
            task.due_date = data["due_date"]
            db.session.commit()
            return jsonify({"message": "Task updated successfully"})
        else:
            return jsonify({"message": "Invalid task id"}), 400
    else:
        return jsonify({"message": "Invalid username"}), 400


def taskType_create(data):
    username = data["username"]
    user = User.query.filter_by(username=username).first()
    if user:
        # 给用户添加新的任务类型
        user.task_types[data["type_name"]] = data["type_icon"]
        db.session.commit()
        return jsonify({"message": "Task type created successfully"})
    else:
        return jsonify({"message": "Invalid username"}), 400


def taskType_delete(data):
    username = data["username"]
    user = User.query.filter_by(username=username).first()
    if user:
        # 删除用户的某个任务类型
        if data["type_name"] in user.task_types:
            del user.task_types[data["type_name"]]
            db.session.commit()
            return jsonify({"message": "Task type deleted successfully"})
        else:
            return jsonify({"message": "Invalid task type name"}), 400
    else:
        return jsonify({"message": "Invalid username"}), 400
