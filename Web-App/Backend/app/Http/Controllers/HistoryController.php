<?php

namespace App\Http\Controllers;

use App\Models\AnalysisHistory;
use Illuminate\Http\Request;

class HistoryController extends Controller
{
    public function index(Request $request)
    {
        $histories = $request->user()->histories()->orderBy('created_at', 'desc')->get();
        return response()->json($histories);
    }

    public function store(Request $request)
    {
        $request->validate([
            'role_id' => 'required|string',
            'role_name' => 'required|string',
            'dynamic_score' => 'required|integer',
            'analysis_result' => 'required|array',
            'completed_skills' => 'present|array',
            'current_skills' => 'present|array',
            'selected_role' => 'required|string',
        ]);

        // Jika riwayat untuk role_id ini sudah ada, lakukan pembaruan (update). Jika belum, buat baru (create).
        // Hal ini untuk menghindari duplikasi riwayat peran yang sama pada satu akun.
        $history = $request->user()->histories()->where('role_id', $request->role_id)->first();

        if ($history) {
            $history->update($request->all());
        } else {
            $history = $request->user()->histories()->create($request->all());
        }

        return response()->json($history, 201);
    }

    public function show(Request $request, $id)
    {
        $history = $request->user()->histories()->findOrFail($id);
        return response()->json($history);
    }

    public function update(Request $request, $id)
    {
        $history = $request->user()->histories()->findOrFail($id);
        $history->update($request->all());
        return response()->json($history);
    }

    public function destroy(Request $request, $id)
    {
        $history = $request->user()->histories()->where('role_id', $id)->orWhere('id', $id)->firstOrFail();
        $history->delete();
        return response()->json(['message' => 'History deleted']);
    }
}
