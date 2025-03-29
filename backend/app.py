# flask 入口文件
from flask import Flask, jsonify, request, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from api.task_routes import task_routes
from api.user_routes import user_routes
from api.models import init_db

app = Flask(__name__)  # 实例化flask对象
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"  # 配置数据库连接
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # 不追踪数据库修改，提高性能

CORS(app, supports_credentials=True)  # 允许跨域请求

app.register_blueprint(task_routes, url_prefix="/tasks")  # 注册蓝图
app.register_blueprint(user_routes, url_prefix="/users")  # 注册蓝图

init_db()

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)  # 启动flask服务
