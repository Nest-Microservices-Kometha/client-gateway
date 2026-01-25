import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Inject,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { ORDER_SERVICE } from 'src/config/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderPaginationDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDER_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Get()
  findOrders(@Query() orderPaginationDto: OrderPaginationDto) {    
    return this.ordersClient.send('findAllOrders', orderPaginationDto);
  }

  @Get(':id')
  async findOrderById(@Param('id') id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send('findOneOrder', { id }),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersClient.send('createOrder', createOrderDto);
  }

  @Patch(':id')
  async updateOrder(@Param('id') id: string, @Body() updateOrderDto: any) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send('changeOrderStatus', {
          id,
          ...updateOrderDto,
        }),
      );

      return order;
    } catch (error) {
      console.log('error papu');
      throw new RpcException(error);
    }
  }
}
