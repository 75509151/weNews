-- MySQL Script generated by MySQL Workbench
-- 06/29/16 17:27:10
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`t_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`t_category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`c_comment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`c_comment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `createtime` DATETIME NOT NULL,
  `content` VARCHAR(45) NOT NULL,
  `deleted` TINYINT(4) NULL DEFAULT 0,
  `opposecount` INT NULL DEFAULT 0,
  `supportocunt` INT NULL DEFAULT 0,
  `newsid` INT NOT NULL,
  `userid` INT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`t_news`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`t_news` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nid` INT NULL,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  `digest` VARCHAR(255) NULL DEFAULT NULL,
  `body` TEXT(255) NULL,
  `source` VARCHAR(45) NULL,
  `commentcount` INT NULL,
  `ptime` VARCHAR(20) NULL,
  `imgsrc` VARCHAR(45) NULL,
  `deleted` TINYINT(4) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`t_users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`t_users` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
