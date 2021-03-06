
import { Container, Col, InputField, MaskInputField, Row, Text } from "@ui.packages/kit";

import React from 'react';


function Customer() {
  return (
    <Container>
      <Row>
        <Col>
          <Row>
            <Col>
              <InputField tabIndex={2} label="Фамилия" name="surname" require />
            </Col>
            <Col>
              <InputField tabIndex={1} label="Имя" name="name" require />
            </Col>
            <Col>
              <InputField tabIndex={2} label="Отчество" name="patronymic" />
            </Col>
          </Row>
          <Row>
            <Col>
              <MaskInputField tabIndex={3} label="Телефон" name="phone" mask="+7 (999) 999-99-99" require />
            </Col>
            <Col>
              <InputField tabIndex={4} label="E-Mail" name="email" require />
            </Col>
            <Col />
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Text type={Text.TYPE_COMMENT}>* номер телефона необхадим для обратной связи оператора по уточнению деталей</Text>
          <Text type={Text.TYPE_COMMENT}>* на электронную почту мы высылаем чек и информацию о заказе</Text>
        </Col>
      </Row>
    </Container>
  );
}

export default Customer;
