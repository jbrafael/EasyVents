<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;

class EventController extends Controller
{
    public function index()
    {
        $events = Event::with('user')->get();
        return response()->json($events);
    }

    public function show(string $id)
    {
        $event = Event::with('user')->findOrFail($id);
        return response()->json($event);
    }

}
