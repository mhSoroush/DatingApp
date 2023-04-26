import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../_modules/Message';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  baseUrl =  environment.apiUrl

  constructor(
    private http: HttpClient,
    private helperService: HelperService) { }

  getMessages(pageNumber: number, pageSize: number, container: string) {
    let params = this.helperService.getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);
    return this.helperService.getPaginatedResult<Message[]>(this.baseUrl + 'messages', params);
  }

  getMessageThread(username: string) {
    return this.http.get<Message[]>(this.baseUrl + 'messages/thread/' + username);
  }

  sendMessage(username :string, content: string) {
    return this.http.post<Message>(this.baseUrl + 'messages', 
    {recipientUsername: username, content})
  }

  deleteMessage(id: number) {
    return this.http.delete(this.baseUrl + 'messages/' + id);
  }
}
