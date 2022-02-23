import { Injectable } from "@angular/core";
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class FetchCameraService {

    /**
     * X軸ののサーボを動作させる
     */
    private readonly SERVO_X_CH: number = 0x00;
    /**
     * Y軸のサーボを操作させる
     */
    private readonly SERVO_Y_CH: number = 0x01;

    /**
     * 一回の操作で動かすアングル値
     */
    private readonly INCREASE_VAL: number = 2;

    unpairedDevices: any;
    pairedDevices: any;

    private _xAngle: number;
    public get XAngle(): number { return this._xAngle; }
    public set XAngle(value: number) {
        if (value < 0) { value = 0; }
        if (value > 90) { value = 90; }
        this._xAngle = value;
    }

    private _yAngle: number;
    public get YAngle(): number { return this._yAngle; }
    public set YAngle(value: number) {
        if (value < 0) { value = 0; }
        if (value > 90) { value = 90; }
        this._yAngle = value;
    }

    constructor(private ble: BluetoothSerial) {
        this.XAngle = 48;
        this.YAngle = 69;
    }


    /**
     * データ送信を行う
     * @param servoCh 操作するサーボのチェンネル
     * @param angle アングル
     * @returns 
     */
    private async sendCommand(servoCh: number, angle: number): Promise<number> {
        let ch: number = servoCh == 0 ? 0x0 : 0x80;
        let cmd: number = (ch | angle);
        await this.ble.write(cmd);
        return cmd;
    }

    /**
     * Bleを初期化する
     */
    public async init(): Promise<void> {
        this.ble.enable();
    }

    /**
     * Bleのデバイスリストを取得する
     * @returns 
     */
    public async getDevices(): Promise<any> {
        return await this.ble.list();
    }

    public async startScanning() {
        this.pairedDevices = null;
        this.unpairedDevices = null;

        this.unpairedDevices = await this.ble.discoverUnpaired();
    }

    /**
     * 選択済みデバイスと接続する
     * @returns 
     */
    public connect(selectedAddress: any): Observable<any> {
        return this.ble.connect(selectedAddress);
    }

    /**
     * 切断する
     */
    public async disconnect(): Promise<void> {
        await this.ble.disconnect();
    }


    public async up(): Promise<number> {
        this.YAngle -= this.INCREASE_VAL;
        return await this.sendCommand(this.SERVO_Y_CH, this.YAngle);
    }

    public async down(): Promise<number> {
        this.YAngle += this.INCREASE_VAL;
        return await this.sendCommand(this.SERVO_Y_CH, this.YAngle);
    }

    public async left(): Promise<number> {
        this.XAngle -= this.INCREASE_VAL;
        return await this.sendCommand(this.SERVO_X_CH, this.XAngle);
    }

    public async right(): Promise<number> {
        this.XAngle += this.INCREASE_VAL;
        return await this.sendCommand(this.SERVO_X_CH, this.XAngle);
    }

}