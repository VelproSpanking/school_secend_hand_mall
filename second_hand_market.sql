/*
 Navicat Premium Data Transfer

 Source Server         : second_hand_market
 Source Server Type    : MySQL
 Source Server Version : 80027
 Source Host           : localhost:3306
 Source Schema         : second_hand_market

 Target Server Type    : MySQL
 Target Server Version : 80027
 File Encoding         : 65001

 Date: 09/03/2022 00:19:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for cate
-- ----------------------------
DROP TABLE IF EXISTS `cate`;
CREATE TABLE `cate`  (
  `id` int(0) NOT NULL,
  `category` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `creat_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of cate
-- ----------------------------
INSERT INTO `cate` VALUES (1, '手机/配件', '1', '2022-01-18 22:20:50');
INSERT INTO `cate` VALUES (2, '电脑', '1', '2022-01-18 22:22:22');
INSERT INTO `cate` VALUES (3, '书籍', '1', '2022-01-18 22:23:05');
INSERT INTO `cate` VALUES (4, '衣物', '1', '2022-01-18 22:23:22');
INSERT INTO `cate` VALUES (5, '饰品', '1', '2022-01-18 22:23:58');
INSERT INTO `cate` VALUES (6, '美妆洗护', '1', '2022-01-18 22:24:42');
INSERT INTO `cate` VALUES (7, '日用百货', '1', '2022-01-18 22:25:04');
INSERT INTO `cate` VALUES (8, '其他', '1', '2022-01-18 22:25:32');

-- ----------------------------
-- Table structure for goods_list
-- ----------------------------
DROP TABLE IF EXISTS `goods_list`;
CREATE TABLE `goods_list`  (
  `goods_id` int(0) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sell_price` double(50, 2) NULL DEFAULT NULL,
  `market_price` double(50, 2) NULL DEFAULT NULL,
  `img_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `classify` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `wechat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `telphone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` bigint(0) NULL DEFAULT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_id` int(0) UNSIGNED NOT NULL,
  PRIMARY KEY (`goods_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods_list
-- ----------------------------
INSERT INTO `goods_list` VALUES (1, '华为（HUAWEI）荣耀6Plus 16G双4G版', 169.00, 269.00, 'http://localhost:3007/public/image/SFZ.png', NULL, NULL, NULL, NULL, NULL, NULL, 0);
INSERT INTO `goods_list` VALUES (2, '苹果Apple iPhone 6 Plus 16G 4G手机（联通三网版）', 59.00, 49.00, 'http://localhost:3007/public/image/1.jpg', NULL, NULL, NULL, NULL, NULL, NULL, 0);

-- ----------------------------
-- Table structure for image
-- ----------------------------
DROP TABLE IF EXISTS `image`;
CREATE TABLE `image`  (
  `id` int(0) NOT NULL,
  `user_id` int(0) NULL DEFAULT NULL,
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for ldle
-- ----------------------------
DROP TABLE IF EXISTS `ldle`;
CREATE TABLE `ldle`  (
  `user_id` int(0) NOT NULL COMMENT '用户的id',
  `ldle_id` int(0) NOT NULL AUTO_INCREMENT COMMENT '处理闲置订单的id',
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '物品名字',
  `classify` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '物品分类',
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` double(50, 2) NULL DEFAULT NULL COMMENT '物品价格',
  `original_price` double(50, 2) NULL DEFAULT NULL COMMENT '原价',
  `wechat` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '微信',
  `telphone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '手机',
  `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图片地址',
  `describe` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '物品描述',
  `create_time` bigint(0) NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`ldle_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tb_user
-- ----------------------------
DROP TABLE IF EXISTS `tb_user`;
CREATE TABLE `tb_user`  (
  `user_id` int(0) UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `wechat` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `user_pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '',
  `email` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `creat_time` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_user
-- ----------------------------
INSERT INTO `tb_user` VALUES (1, '顾以然', '123456', '', '', NULL, '', NULL, NULL);
INSERT INTO `tb_user` VALUES (2, '蒋小鹿', '111111', '', '', 'http://localhost:3007/uploads/���5PH(1)2.png', '', NULL, NULL);
INSERT INTO `tb_user` VALUES (6, 'admin', '$2a$10$X9gidfTvRqJg1YqvDwV30.wAXSyFRAjhmt5pDAupZxKUl3nEsBnIG', '', '', 'http://localhost:3007/uploads/���5Pc.png', '', NULL, NULL);
INSERT INTO `tb_user` VALUES (7, 'admin13', '$2a$10$QdnjCCirbfZOuA4BQWsgmObKMgAskJE3MW4fHUv8hwpYBbmDAViMW', '', '', NULL, '', NULL, NULL);
INSERT INTO `tb_user` VALUES (8, '许泽清', '$2a$10$9Qk2PCZ9VQmON/VHqpm05e4As8TsP14fxpxzC.8pJpoe1HY7d6sHi', '', '', 'http://localhost:3007/uploads/���5Pc.png', '', NULL, NULL);
INSERT INTO `tb_user` VALUES (9, 'hulingtao', '$2a$10$l2jC/ah4yOVBEuCIFQyuWeRzWB4ouUbGG3CJ4gLCeWq4AaEq0PxT2', '', '', NULL, '', NULL, NULL);
INSERT INTO `tb_user` VALUES (10, '111', '$2a$10$YHHZJjfXp531E/3FP./cheTSRJRO/SGFEORcpMywRcGjkHb6BLJ3a', '', '', NULL, '', NULL, NULL);
INSERT INTO `tb_user` VALUES (11, '许泽清01', '$2a$10$E9fhSHmS/529LpZuJwbEwuOlHYXAryZ4RXkoge6U6kVlaMfGEZ/zi', '', '', NULL, '', NULL, NULL);
INSERT INTO `tb_user` VALUES (12, '蒋大鹿', '$2a$10$mFrR68W6Z2CLi.2e7.Igz.vvfLdubabQGREbWFbO5MTLjwiZDCD1a', '', '', NULL, '', NULL, NULL);
INSERT INTO `tb_user` VALUES (13, '许泽清02', '$2a$10$iwPU0NTfu/gGj2iJ01SU/ukvQZPguB8HkfD1lugeYNJ0N9JvvBMcW', NULL, NULL, '', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
