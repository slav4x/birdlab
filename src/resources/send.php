<?php

  const CHATID = "#";
  const TOKEN = "#";

  $success = false;
  if (!empty($_POST["t"])) { $success = true; }

  if ($success) {

    $form = isset($_POST["form"]) ? "<b>Форма:</b>\n" . $_POST["form"] . "\n\n" : "";
    $name = isset($_POST["name"]) ? "<b>Имя:</b>\n" . $_POST["name"] . "\n\n" : "";
    $contact = isset($_POST["contact"]) ? "<b>Контакт:</b>\n" . $_POST["contact"] . "\n\n" : "";
    $comment = isset($_POST["comment"]) ? "<b>Комментарий:</b>\n" . $_POST["comment"] . "\n\n" : "";

    $quiz1 = isset($_POST["quiz_1"]) ? "<b>Какие задачи необходимо решить:</b>\n" . implode(", ", $_POST["quiz_1"]) . "\n\n" : "";
    $quiz2 = isset($_POST["quiz_2"]) ? "<b>Есть готовая структура / тексты:</b>\n" . $_POST["quiz_2"] . "\n\n" : "";
    $quiz3 = isset($_POST["quiz_3"]) ? "<b>Объем задачи:</b>\n" . $_POST["quiz_3"] . "\n\n" : "";
    $quiz4 = isset($_POST["quiz_4"]) ? "<b>Стиль вашего проекта:</b>\n" . implode(", ", $_POST["quiz_4"]) . "\n\n" : "";

    $text = $form . $name . $contact . $comment . $quiz1 . $quiz2 . $quiz3 . $quiz4;

    $params = array(
      "chat_id" => CHATID,
      "text" => $text,
      "parse_mode" => "HTML",
    );

    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, "https://api.telegram.org/bot" . TOKEN . "/sendMessage");
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $params);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($curl);
    curl_close($curl);

    if (isset($_FILES["file"]) && $_FILES["file"]["error"] == 0) {
      $file_path = $_FILES["file"]["tmp_name"];
      $file_type = $_FILES["file"]["type"];
      $file_name = $_FILES["file"]["name"];

      $document = new CURLFile($file_path, $file_type, $file_name);
      $data = array(
        "chat_id" => CHATID,
        "document" => $document
      );

      $ch = curl_init();
      curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        "Content-Type:multipart/form-data"
      ));
      curl_setopt($ch, CURLOPT_URL, "https://api.telegram.org/bot" . TOKEN . "/sendDocument");
      curl_setopt($ch, CURLOPT_POST, true);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      $result = curl_exec($ch);
      curl_close($ch);
    }

    header("Location: thanks.html");
    exit;

  }

  header("Location: thanks.html");
  exit;
?>
