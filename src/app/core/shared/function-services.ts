import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http'
import { Observable } from 'rxjs/Observable';
declare var $: any
declare var AmCharts: any
declare var toastr: any
@Injectable()
export class FunctionService {
  constructor(
    private http: Http,
  ) { }
  initPopupEffect() {
    $(".modal").each(function (l) { $(this).on("show.bs.modal", function (l) { var o = $(this).attr("data-easein"); "shake" == o ? $(".modal-dialog").velocity("callout." + o) : "pulse" == o ? $(".modal-dialog").velocity("callout." + o) : "tada" == o ? $(".modal-dialog").velocity("callout." + o) : "flash" == o ? $(".modal-dialog").velocity("callout." + o) : "bounce" == o ? $(".modal-dialog").velocity("callout." + o) : "swing" == o ? $(".modal-dialog").velocity("callout." + o) : $(".modal-dialog").velocity("transition." + o) }) });
  }
  confirmPopup(id, callback, header, message) {
    let html =
      '<div id="popConfirm" class="modal modal-confirm" data-easein="slideUpBigIn" tabindex="-1" role="dialog" aria-labelledby="costumModalLabel" aria-hidden="true">' +
      '<div class="modal-dialog">' +
      '<div class="modal-content">' +
      '<div class="modal-header">' +
      '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>' +
      '<h4 class="modal-title">' + header + '</h4>' +
      '</div>' +
      '<div class="modal-body"><p>' + message + '</p></div>' +
      '<div class="modal-footer">' +
      '<button class="btn btn-fill btn-default" data-dismiss="modal" aria-hidden="true">Hủy</button>' +
      '<button class="btn btn-fill btn-danger" id="confirmBtn">Đồng ý</button>' +
      '</div></div></div></div>'
    $('body').append(html)
    $('#popConfirm').on("show.bs.modal", function (l) { var o = $(this).attr("data-easein"); "shake" == o ? $(".modal-dialog").velocity("callout." + o) : "pulse" == o ? $(".modal-dialog").velocity("callout." + o) : "tada" == o ? $(".modal-dialog").velocity("callout." + o) : "flash" == o ? $(".modal-dialog").velocity("callout." + o) : "bounce" == o ? $(".modal-dialog").velocity("callout." + o) : "swing" == o ? $(".modal-dialog").velocity("callout." + o) : $(".modal-dialog").velocity("transition." + o) })
    $('#popConfirm').modal('show')
    $('#popConfirm').on('hidden.bs.modal', function (e) {
      $('#popConfirm').remove()
    })
    $('#confirmBtn').off('click').on('click', function () {
      console.log('click delete')
      if (typeof (callback) == "function") {
        callback()
        $('#popConfirm').modal('hide')
      }
    })
  }
  convertTime(time, type, format) {
    let sTime = new Date(time * 1000),
      dd = (sTime.getDate() < 10) ? '0' + sTime.getDate() : sTime.getDate(),
      mm = ((sTime.getMonth() + 1) < 10) ? '0' + (sTime.getMonth() + 1) : (sTime.getMonth() + 1),
      yy = sTime.getFullYear(),
      hour = (sTime.getHours() < 10) ? '0' + sTime.getHours() : sTime.getHours(),
      minute = (sTime.getMinutes() < 10) ? '0' + sTime.getMinutes() : sTime.getMinutes(),
      second = (sTime.getSeconds() < 10) ? '0' + sTime.getSeconds() : sTime.getSeconds(),
      finalHour = hour + ":" + minute + ":" + second,
      finalDay = ''
    switch (format) {
      case 'dd-mm-yy':
        finalDay = dd + "-" + mm + "-" + yy;
        break;
      case 'mm-dd-yy':
        finalDay = mm + "-" + dd + "-" + yy;
        break;
      case 'yy-mm-dd':
        finalDay = yy + "-" + mm + "-" + dd;
        break;
    }
    switch (type) {
      case 'time':
        return finalHour
      case 'day':
        return finalDay
      default:
        break;
    }
  }
  randomName() {
    let currentTime: any
    currentTime = new Date
    currentTime = Date.parse(currentTime).toString()
    return currentTime
  }
  //validation
  validateEmail(value) {
    if (value == "") return true;
    var regex = /^[_a-zA-Z0-9]+(\.[_a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;
    var result = regex.test(value);
    return result;
  }
  ValidateStringRequired(element, elementName) {
    let disabledStatus = $(element).attr('disabled'),
      value = $(element).val(),
      showError = false,
      message = "";
    if (disabledStatus !== undefined && disabledStatus === 'disabled') {
      return false;
    }

    if (value == null || value.trim() == '') {
      showError = true;
      message = elementName + ' không được bỏ trống.';
    }
    if (showError) {
      $(element).parents('.input-group:first').addClass("has-error");
      $(".has-error:first input:not('.date-picker')").focus();
      toastr.remove();
      toastr.error(message);
    } else {
      toastr.clear();
      $(element).parents('.input-group:first').removeClass("has-error");
    }
    return showError;
  }
  ValidateEmailFormat(element, elementName, isRequired) {
    let disabledStatus = $(element).attr('disabled'),
      value = $(element).val().trim(),
      showError = false,
      message = "";
    if (disabledStatus !== undefined && disabledStatus === 'disabled') {
      return false;
    }

    if (isRequired) {
      if (value == null || value == '') {
        showError = true;
        message = elementName + ' không được bỏ trống.';
      }
    }
    if (!showError) {
      var list = value.split(';');
      for (var i = 0; i < list.length; i++) {
        var resultEmail = this.validateEmail(list[i].trim());
        if (!resultEmail) {
          showError = true;
          message = "Email phải có dạng example@domain";
          break;
        }
      }
    }
    if (showError) {
      $(element).parents('.input-group:first').addClass("has-error");
      $(".has-error:first input:not('.date-picker')").focus();
      toastr.remove();
      toastr.error(message);

    } else {
      toastr.clear();
      $(element).parents('.input-group:first').removeClass("has-error");
    }
    return showError;
  }
  ValidateDateRequired(element, elementName) {
    let disabledStatus = $(element).attr('disabled'),
      date = $(element).val(),
      showError = false,
      message = "";
    if (disabledStatus !== undefined && disabledStatus === 'disabled') {
      return false;
    }

    if (date == "") {
      showError = true;
      message = "Bạn không được bỏ trống " + elementName;
    }
    if (showError) {
      $(element).parents('.input-group:first').addClass("has-error");
      toastr.remove();
      toastr.error(message);
    } else {
      toastr.clear();
      $(element).parents('.input-group:first').removeClass("has-error");
    }
    return showError;
  }
}